import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { ForbiddenError, InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyNotBanned: FastifyAuthFunction
    }
}

export const verifyNotBanned: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyNotBanned"]>("verifyNotBanned", req => {
        if (!req.userData) {
            throw new InternalServerError(req.ll.unexpectedError())
        }

        if (req.userData.ban) {
            throw new ForbiddenError(req.ll.banned())
        }
    })

    done()
}
