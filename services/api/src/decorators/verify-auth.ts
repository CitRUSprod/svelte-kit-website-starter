import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { InternalServerError } from "http-errors"

declare module "fastify" {
    interface FastifyInstance {
        verifyAuth: FastifyAuthFunction
    }
}

export const verifyAuth: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyAuth"]>("verifyAuth", async req => {
        if (!("userData" in req)) {
            if (req.authError) {
                throw req.authError
            } else {
                throw new InternalServerError("userData field is not set")
            }
        }
    })

    done()
}
