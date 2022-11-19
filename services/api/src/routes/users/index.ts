import { FastifyPluginCallback } from "fastify"
import { Permission } from "@prisma/client"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const usersRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: schemas.GetUsersQuery }>("/", {
        schema: {
            tags: ["users"],
            querystring: schemas.getUsersQuery
        },
        preHandler: app.createPreHandler([app.setUserData]),
        async handler(req, reply) {
            const data = await handlers.getUsers(app, { userData: req.userData!, query: req.query })
            await reply.sendData(data)
        }
    })

    app.get<{ Params: schemas.GetUserParams }>("/:id", {
        schema: {
            tags: ["users"],
            params: schemas.getUserParams
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

    app.post<{ Params: schemas.AssignRoleToUserParams }>("/:id/role/:roleId", {
        schema: {
            tags: ["users"],
            params: schemas.assignRoleToUserParams
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(Permission.AssignRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.assignRoleToUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.BanUserParams }>("/:id/ban", {
        schema: {
            tags: ["users"],
            params: schemas.banUserParams
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.banUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.UnbanUserParams }>("/:id/unban", {
        schema: {
            tags: ["users"],
            params: schemas.unbanUserParams
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(Permission.BanUser)
        ]),
        async handler(req, reply) {
            const data = await handlers.unbanUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
