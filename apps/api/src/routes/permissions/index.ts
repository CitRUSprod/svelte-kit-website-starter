import { FastifyPluginCallback } from "fastify"
import * as enums from "$/enums"
import * as handlers from "./handlers"

export const permissionsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get("/", {
        schema: {
            tags: ["permissions"]
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyPermission(enums.Permission.CreateRole)
        ]),
        async handler(req, reply) {
            const data = await handlers.getPermissions(app, {})
            await reply.sendData(data)
        }
    })

    done()
}
