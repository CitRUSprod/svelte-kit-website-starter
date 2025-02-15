import type { FastifyAuthFunction } from "@fastify/auth"
import type { FastifyInstance, FastifyPluginCallback } from "fastify"
import { InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyAuth: FastifyAuthFunction
    }
}

export const verifyAuth: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.decorate<FastifyInstance["verifyAuth"]>("verifyAuth", async req => {
        if (!("userData" in req)) {
            if (req.authError) {
                throw req.authError
            } else {
                throw new InternalServerError(req.ll.userDataFieldIsNotSet())
            }
        }
    })

    done()
}
