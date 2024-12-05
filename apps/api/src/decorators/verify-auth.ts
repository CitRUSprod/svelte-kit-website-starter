import type { FastifyInstance, FastifyPluginCallback } from "fastify"
import type { FastifyAuthFunction } from "@fastify/auth"
import { InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
