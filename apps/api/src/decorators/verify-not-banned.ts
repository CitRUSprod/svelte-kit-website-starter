import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { ForbiddenError, InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyNotBanned: FastifyAuthFunction
    }
}

export const verifyNotBanned: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyNotBanned"]>("verifyNotBanned", async req => {
        if (!req.userData) throw new InternalServerError("Unexpected error")
        if (req.userData.ban) throw new ForbiddenError("Banned")
    })

    done()
}
