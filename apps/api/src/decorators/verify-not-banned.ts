import type { FastifyAuthFunction } from "@fastify/auth"
import type { FastifyInstance, FastifyPluginCallback } from "fastify"
import { ForbiddenError, InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyNotBanned: FastifyAuthFunction
    }
}

export const verifyNotBanned: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.decorate<FastifyInstance["verifyNotBanned"]>("verifyNotBanned", async req => {
        if (!req.userData) {
            throw new InternalServerError(req.ll.unexpectedError())
        }

        if (req.userData.ban) {
            throw new ForbiddenError(req.ll.banned())
        }
    })

    done()
}
