import { FastifyPluginCallback } from "fastify"
import authRoute from "./auth"

const route = ((app, opts, next) => {
    app.register(authRoute, { prefix: "/auth" })

    app.get("/", async (req, reply) => {
        reply.send({
            message: "Hello world"
        })
    })

    next()
}) as FastifyPluginCallback

export default route
