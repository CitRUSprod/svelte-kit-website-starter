import { FastifyPluginCallback } from "fastify"

const route = ((app, opts, next) => {
    app.get("/", (req, reply) => {
        reply.send({
            message: "Hello world"
        })
    })

    next()
}) as FastifyPluginCallback

export default route
