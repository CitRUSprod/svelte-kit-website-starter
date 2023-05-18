import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { HttpError, InternalServerError } from "http-errors"
import { UserPayload, UserData } from "$/types"

declare module "fastify" {
    interface FastifyInstance {
        setUserData: FastifyAuthFunction
    }

    interface FastifyRequest {
        userData?: UserData
        authError?: HttpError
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: UserPayload
    }
}

export const setUserData: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["setUserData"]>("setUserData", async req => {
        let payload: UserPayload | undefined

        try {
            payload = await req.jwtVerify<UserPayload>()
        } catch (err: any) {
            req.authError = err
        }

        if (payload) {
            const user = await app.prisma.user.findFirst({
                where: { id: payload.id },
                include: { role: true }
            })

            if (user === null) {
                throw new InternalServerError("User with such ID was not found")
            } else {
                req.userData = user
            }
        }
    })

    done()
}
