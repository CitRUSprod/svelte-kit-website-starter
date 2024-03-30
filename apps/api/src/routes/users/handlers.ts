import { BadRequestError } from "http-errors-enhanced"
import { Prisma } from "@prisma/client"
import * as schemasRoutes from "@local/schemas/routes"
import { getItemsPage, models } from "$/utils"
import { UserData, RouteHandler } from "$/types"

export const getUsers = (async (app, ll, { query }) => {
    const page = await getItemsPage(query.page, query.perPage, async (skip, take) => {
        const where: Prisma.UserWhereInput = {
            email: { contains: query.email, mode: "insensitive" },
            username: { contains: query.username, mode: "insensitive" }
        }

        const totalItems = await app.prisma.user.count({ where })
        const users = await app.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: { [query.sort]: query.order },
            include: { role: true, ban: { include: { author: true } } }
        })

        return { totalItems, items: users.map(models.user.dto) }
    })

    return { payload: page }
}) satisfies RouteHandler<
    schemasRoutes.users.GetUsersResponse,
    { userData?: UserData; query: schemasRoutes.users.GetUsersQuery }
>

export const getUser = (async (app, ll, { params }) => {
    const user = await models.user.get(app, params.id)
    return { payload: models.user.dto(user) }
}) satisfies RouteHandler<
    schemasRoutes.users.GetUserResponse,
    { userData?: UserData; params: schemasRoutes.users.GetUserParams }
>

export const assignRoleToUser = (async (app, ll, { params }) => {
    const user = await models.user.get(app, params.id)
    const role = await models.role.get(app, params.roleId)

    if (user.roleId === params.roleId) {
        throw new BadRequestError(ll.$users.userWithSuchIdIsAlready({ roleName: role.name }))
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: params.id },
        data: { roleId: params.roleId },
        include: { role: true, ban: { include: { author: true } } }
    })

    return { payload: models.user.dto(updatedUser) }
}) satisfies RouteHandler<
    schemasRoutes.users.AssignRoleToUserResponse,
    { params: schemasRoutes.users.AssignRoleToUserParams }
>

export const banUser = (async (app, ll, { userData, params, body }) => {
    const user = await models.user.get(app, params.id)
    if (user.ban) throw new BadRequestError(ll.$users.userWithSuchIdIsAlreadyBanned())

    await app.prisma.ban.create({
        data: {
            userId: params.id,
            authorId: userData.id,
            reason: body.reason,
            date: new Date()
        }
    })

    const bannedUser = await app.prisma.user.update({
        where: { id: params.id },
        data: { roleId: 1 },
        include: { role: true, ban: { include: { author: true } } }
    })

    return { payload: models.user.dto(bannedUser) }
}) satisfies RouteHandler<
    schemasRoutes.users.BanUserResponse,
    {
        userData: UserData
        params: schemasRoutes.users.BanUserParams
        body: schemasRoutes.users.BanUserBody
    }
>

export const unbanUser = (async (app, ll, { params }) => {
    const user = await models.user.get(app, params.id)
    if (!user.ban) throw new BadRequestError(ll.$users.userWithSuchIdIsNotBanned())

    await app.prisma.ban.delete({
        where: { userId: params.id }
    })

    const unbannedUser = await models.user.get(app, params.id)

    return { payload: models.user.dto(unbannedUser) }
}) satisfies RouteHandler<
    schemasRoutes.users.UnbanUserResponse,
    { params: schemasRoutes.users.UnbanUserParams }
>
