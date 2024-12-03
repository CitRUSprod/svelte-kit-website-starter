import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { InternalServerError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyAuth: FastifyAuthFunction
    }
}

export const verifyAuth: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyAuth"]>("verifyAuth", req => {
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
