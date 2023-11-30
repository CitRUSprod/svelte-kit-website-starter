import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { ForbiddenError } from "http-errors-enhanced"

declare module "fastify" {
    interface FastifyInstance {
        verifyConfirmedEmail: FastifyAuthFunction
    }
}

export const verifyConfirmedEmail: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyConfirmedEmail"]>("verifyConfirmedEmail", async req => {
        if (!req.userData!.confirmedEmail) throw new ForbiddenError("Not confirmed email")
    })

    done()
}
