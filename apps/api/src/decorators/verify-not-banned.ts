import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { ForbiddenError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyNotBanned: FastifyAuthFunction
    }
}

export const verifyNotBanned: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyNotBanned"]>("verifyNotBanned", async req => {
        if (req.userData!.ban) throw new ForbiddenError("Banned")
    })

    done()
}
