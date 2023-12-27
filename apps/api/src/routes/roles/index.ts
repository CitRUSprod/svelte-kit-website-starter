import { FastifyPluginCallback } from "fastify"
import * as enums from "$/enums"
import * as common from "$/common"
import * as handlers from "./handlers"

export const rolesRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(common.roles.getRolesPath, {
        schema: {
            tags: [common.roles.basePath]
        },
        async handler(req, reply) {
            const data = await handlers.getRoles(app, {})
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.roles.CreateRoleBody }>(common.roles.createRolePath, {
        schema: {
            tags: [common.roles.basePath],
            body: common.roles.createRoleBodySchema()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(enums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.createRole(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.patch<{ Params: common.roles.UpdateRoleParams; Body: common.roles.UpdateRoleBody }>(
        common.roles.updateRolePath,
        {
            schema: {
                tags: [common.roles.basePath],
                params: common.roles.updateRoleParamsSchema(),
                body: common.roles.updateRoleBodySchema()
            },
            preHandler: app.createPreHandler([
                app.setUserData,
                app.verifyAuth,
                app.verifyConfirmedEmail,
                app.verifyPermission(enums.Permission.CreateRole)
            ]),
            async handler(req, reply) {
                const data = await handlers.updateRole(app, { params: req.params, body: req.body })
                await reply.sendData(data)
            }
        }
    )

    app.delete<{ Params: common.roles.DeleteRoleParams }>(common.roles.deleteRolePath, {
        schema: {
            tags: [common.roles.basePath],
            params: common.roles.deleteRoleParamsSchema()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyPermission(enums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.deleteRole(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
