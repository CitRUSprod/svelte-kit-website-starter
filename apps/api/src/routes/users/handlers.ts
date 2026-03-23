import * as schemasRoutes from "@repo/schemas/routes"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"

import { Prisma } from "$/prisma/generated/client"
import { defineRouteHandler, getItemsPage, models } from "$/utils"

export const getUsers = defineRouteHandler<
    { Querystring: schemasRoutes.users.$GetUsersQuery },
    schemasRoutes.users.$GetUsersResponse
>(async (app, req) => {
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

        return {
            totalItems,
            items: users.map(user => models.user.dto(user))
        }
    })

    return {
        payload: page
    }
})

export const getUser = defineRouteHandler<
    { Params: schemasRoutes.users.$GetUserParams },
    schemasRoutes.users.$GetUserResponse
>(async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)

    return {
        payload: models.user.dto(user)
    }
})

export const assignRoleToUser = defineRouteHandler<
    { Params: schemasRoutes.users.$AssignRoleToUserParams },
    schemasRoutes.users.$AssignRoleToUserResponse
>(async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)
    const role = await models.role.get(app, req, req.params.roleId)

    if (user.roleId === req.params.roleId) {
        throw new BadRequestError(req.ll.userWithSuchIdIsAlready({ roleName: role.name }))
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: req.params.id },
        data: { roleId: req.params.roleId },
        include: models.user.include
    })

    return {
        payload: models.user.dto(updatedUser)
    }
})

export const banUser = defineRouteHandler<
    { Params: schemasRoutes.users.$BanUserParams; Body: schemasRoutes.users.$BanUserBody },
    schemasRoutes.users.$BanUserResponse
>(async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const user = await models.user.get(app, req, req.params.id)

    if (user.ban) {
        throw new BadRequestError(req.ll.userWithSuchIdIsAlreadyBanned())
    }

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
        include: models.user.include
    })

    return {
        payload: models.user.dto(bannedUser)
    }
})

export const unbanUser = defineRouteHandler<
    { Params: schemasRoutes.users.$UnbanUserParams },
    schemasRoutes.users.$UnbanUserResponse
>(async (app, req) => {
    const user = await models.user.get(app, req, req.params.id)

    if (!user.ban) {
        throw new BadRequestError(req.ll.userWithSuchIdIsNotBanned())
    }

    await app.prisma.ban.delete({
        where: { userId: req.params.id }
    })

    const unbannedUser = await models.user.get(app, req, req.params.id)

    return {
        payload: models.user.dto(unbannedUser)
    }
})
