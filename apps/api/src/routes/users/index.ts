import { FastifyPluginCallback } from "fastify"
import * as enums from "$/enums"
import * as common from "$/common"
import * as handlers from "./handlers"

export const usersRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: common.users.GetUsersQuery }>(common.users.getUsersPath, {
        schema: {
            tags: [common.users.basePath],
            querystring: common.users.getUsersQuerySchema()
        },
        preHandler: app.createPreHandler([app.setUserData]),
        async handler(req, reply) {
            const data = await handlers.getUsers(app, { userData: req.userData!, query: req.query })
            await reply.sendData(data)
        }
    })

    app.get<{ Params: common.users.GetUserParams }>(common.users.getUserPath, {
        schema: {
            tags: [common.users.basePath],
            params: common.users.getUserParamsSchema()
        },
        preHandler: app.createPreHandler([app.setUserData]),
        async handler(req, reply) {
            const data = await handlers.getUser(app, {
                userData: req.userData!,
                params: req.params
            })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: common.users.AssignRoleToUserParams }>(common.users.assignRoleToUserPath, {
        schema: {
            tags: [common.users.basePath],
            params: common.users.assignRoleToUserParamsSchema()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(enums.Permission.AssignRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.assignRoleToUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: common.users.BanUserParams }>(common.users.banUserPath, {
        schema: {
            tags: [common.users.basePath],
            params: common.users.banUserParamsSchema()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(enums.Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.banUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: common.users.UnbanUserParams }>(common.users.unbanUserPath, {
        schema: {
            tags: [common.users.basePath],
            params: common.users.unbanUserParamsSchema()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(enums.Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.unbanUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
