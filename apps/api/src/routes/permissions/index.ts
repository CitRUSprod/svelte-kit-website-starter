import { FastifyPluginCallback } from "fastify"
import * as constantsEnums from "@local/constants/enums"
import * as constantsRoutes from "@local/constants/routes"
import * as handlers from "./handlers"

export const permissionsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(constantsRoutes.permissions.getPermissions, {
        schema: {
            tags: [constantsRoutes.permissions.base]
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyPermission(constantsEnums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.getPermissions()
            await reply.sendData(data)
        }
    })

    done()
}
