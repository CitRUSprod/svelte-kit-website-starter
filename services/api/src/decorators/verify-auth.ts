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
            throw new InternalServerError("userData field is not set")
        } else if (req.userData === null) {
            throw new InternalServerError("User with such ID was not found")
        }
    })

    done()
}
