import { FastifyPluginCallback } from "fastify"
import * as enums from "$/enums"
import * as common from "$/common"
import * as handlers from "./handlers"

export const permissionsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(common.permissions.getPermissionsPath, {
        schema: {
            tags: [common.permissions.basePath]
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyPermission(enums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.getPermissions()
            await reply.sendData(data)
        }
    })

    done()
}
