import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import { Prisma } from "@prisma/client"
import * as schemasRoutes from "@local/schemas/routes"
import { getItemsPage, models } from "$/utils"
import { RouteHandler } from "$/types"

export const getUsers = (async (app, req) => {
    const page = await getItemsPage(req.query.page, req.query.perPage, async (skip, take) => {
        const where: Prisma.UserWhereInput = {
            email: { contains: req.query.email, mode: "insensitive" },
            username: { contains: req.query.username, mode: "insensitive" }
        }

        const totalItems = await app.prisma.user.count({ where })
        const users = await app.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: { [req.query.sort]: req.query.order },
            include: { role: true, ban: { include: { author: true } } }
        })

        return { totalItems, items: users.map(models.user.dto) }
    })

    return { payload: page }
}) satisfies RouteHandler<
    { Querystring: schemasRoutes.users.GetUsersQuery },
    schemasRoutes.users.GetUsersResponse
>

export const getUser = (async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)
    return { payload: models.user.dto(user) }
}) satisfies RouteHandler<
    { Params: schemasRoutes.users.GetUserParams },
    schemasRoutes.users.GetUserResponse
>

export const assignRoleToUser = (async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)
    const role = await models.role.get(app, req, req.params.roleId)

    if (user.roleId === req.params.roleId) {
        throw new BadRequestError(req.ll.userWithSuchIdIsAlready({ roleName: role.name }))
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: req.params.id },
        data: { roleId: req.params.roleId },
        include: { role: true, ban: { include: { author: true } } }
    })

    return { payload: models.user.dto(updatedUser) }
}) satisfies RouteHandler<
    { Params: schemasRoutes.users.AssignRoleToUserParams },
    schemasRoutes.users.AssignRoleToUserResponse
>

export const banUser = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.unexpectedError())

    const user = await models.user.get(app, req, req.params.id)
    if (user.ban) throw new BadRequestError(req.ll.userWithSuchIdIsAlreadyBanned())

    await app.prisma.ban.create({
        data: {
            userId: req.params.id,
            authorId: req.userData.id,
            reason: req.body.reason,
            date: new Date()
        }
    })

    const bannedUser = await app.prisma.user.update({
        where: { id: req.params.id },
        data: { roleId: 1 },
        include: { role: true, ban: { include: { author: true } } }
    })

    return { payload: models.user.dto(bannedUser) }
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.users.BanUserParams
        Body: schemasRoutes.users.BanUserBody
    },
    schemasRoutes.users.BanUserResponse
>

export const unbanUser = (async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)
    if (!user.ban) throw new BadRequestError(req.ll.userWithSuchIdIsNotBanned())

    await app.prisma.ban.delete({
        where: { userId: req.params.id }
    })

    const unbannedUser = await models.user.get(app, req, req.params.id)

    return { payload: models.user.dto(unbannedUser) }
}) satisfies RouteHandler<
    { Params: schemasRoutes.users.UnbanUserParams },
    schemasRoutes.users.UnbanUserResponse
>
