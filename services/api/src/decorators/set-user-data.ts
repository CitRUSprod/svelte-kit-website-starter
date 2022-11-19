import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { UserPayload, UserData } from "$/types"

declare module "fastify" {
    interface FastifyInstance {
        setUserData: FastifyAuthFunction
    }

    interface FastifyRequest {
        userData?: UserData | null
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: UserPayload
    }
}

export const setUserData: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["setUserData"]>("setUserData", async req => {
        const payload = await req.jwtVerify<UserPayload>()
        req.userData = await app.prisma.user.findFirst({
            where: { id: payload.id },
            include: { role: true }
        })
    })

    done()
}
