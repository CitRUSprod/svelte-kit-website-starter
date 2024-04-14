import { FastifyPluginCallback } from "fastify"
import * as constantsEnums from "@local/constants/enums"
import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import * as handlers from "./handlers"

export const rolesRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(constantsRoutes.roles.getRoles, {
        schema: {
            tags: [constantsRoutes.roles.base]
        },
        async handler(req, reply) {
            const data = await handlers.getRoles(app)
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.roles.CreateRoleBody }>(constantsRoutes.roles.createRole, {
        schema: {
            tags: [constantsRoutes.roles.base],
            body: schemasRoutes.roles.createRoleBody()
        },
        preHandler: app.createPreHandler([
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.createRole(app, req)
            await reply.sendData(data)
        }
    })

    app.patch<{
        Params: schemasRoutes.roles.UpdateRoleParams
        Body: schemasRoutes.roles.UpdateRoleBody
    }>(constantsRoutes.roles.updateRole, {
        schema: {
            tags: [constantsRoutes.roles.base],
            params: schemasRoutes.roles.updateRoleParams(),
            body: schemasRoutes.roles.updateRoleBody()
        },
        preHandler: app.createPreHandler([
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.updateRole(app, req)
            await reply.sendData(data)
        }
    })

    app.delete<{ Params: schemasRoutes.roles.DeleteRoleParams }>(constantsRoutes.roles.deleteRole, {
        schema: {
            tags: [constantsRoutes.roles.base],
            params: schemasRoutes.roles.deleteRoleParams()
        },
        preHandler: app.createPreHandler([
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.deleteRole(app, req)
            await reply.sendData(data)
        }
    })

    done()
}
