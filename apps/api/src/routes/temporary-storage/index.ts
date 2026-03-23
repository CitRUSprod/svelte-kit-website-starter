import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"
import type { FastifyPluginCallback } from "fastify"

import * as handlers from "./handlers"

export const temporaryStorageRoutes: FastifyPluginCallback = app => {
    app.post<{
        Body: schemasRoutes.temporaryStorage.$UploadImageBody
    }>(constantsRoutes.temporaryStorage.uploadImage, {
        schema: {
            tags: [constantsRoutes.temporaryStorage.base],
            body: schemasRoutes.temporaryStorage.$uploadImageBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.uploadImage(app, req, {})
            await reply.sendData(data)
        }
    })
}
