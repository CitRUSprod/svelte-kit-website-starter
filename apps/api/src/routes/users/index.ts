import { FastifyPluginCallback } from "fastify"
import * as constantsEnums from "@local/constants/enums"
import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import * as handlers from "./handlers"

export const usersRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: schemasRoutes.users.GetUsersQuery }>(constantsRoutes.users.getUsers, {
        schema: {
            tags: [constantsRoutes.users.base],
            querystring: schemasRoutes.users.getUsersQuery()
        },
        preHandler: app.createPreHandler([app.setUserData]),
        async handler(req, reply) {
            const data = await handlers.getUsers(app, { userData: req.userData!, query: req.query })
            await reply.sendData(data)
        }
    })

    app.get<{ Params: schemasRoutes.users.GetUserParams }>(constantsRoutes.users.getUser, {
        schema: {
            tags: [constantsRoutes.users.base],
            params: schemasRoutes.users.getUserParams()
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

    app.post<{ Params: schemasRoutes.users.AssignRoleToUserParams }>(
        constantsRoutes.users.assignRoleToUser,
        {
            schema: {
                tags: [constantsRoutes.users.base],
                params: schemasRoutes.users.assignRoleToUserParams()
            },
            preHandler: app.createPreHandler([
                app.setUserData,
                app.verifyAuth,
                app.verifyPermission(constantsEnums.Permission.AssignRole)
            ]),
            async handler(req, reply) {
                const data = await handlers.assignRoleToUser(app, { params: req.params })
                await reply.sendData(data)
            }
        }
    )

    app.post<{ Params: schemasRoutes.users.BanUserParams }>(constantsRoutes.users.banUser, {
        schema: {
            tags: [constantsRoutes.users.base],
            params: schemasRoutes.users.banUserParams()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.banUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemasRoutes.users.UnbanUserParams }>(constantsRoutes.users.unbanUser, {
        schema: {
            tags: [constantsRoutes.users.base],
            params: schemasRoutes.users.unbanUserParams()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.unbanUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
