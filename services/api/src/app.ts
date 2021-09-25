import fastify, { FastifyInstance } from "fastify"
import typeorm from "fastify-typeorm-plugin"
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import auth, { FastifyAuthFunction } from "fastify-auth"
import socketIo from "fastify-socket.io"
import { fastifyYupSchema as yupSchema, createYupSchema } from "fastify-yup-schema"
import { MethodNotAllowed } from "http-errors"
import { Payload } from "$/types"
import routes from "$/routes"
import { init as initSockets } from "$/sockets"
import * as entities from "$/db/entities"
import { TokenTtl, Role } from "$/enums"
import { hasAccess } from "$/utils"

interface Tokens {
    access: string
    refresh: string
}

declare module "fastify" {
    interface FastifyInstance {
        generateTokens(payload: Payload): Tokens
        getPayload(token: string): [Payload, null] | [null, Error]
        createYupSchema: typeof createYupSchema
        isAuthorized: FastifyAuthFunction
        hasAccess(...allowedRoles: Array<Role>): FastifyAuthFunction
    }
}

const port = 6702

const typeormConfig = JSON.parse(process.env.TYPEORM_CONFIG!)
const jwtSecret = process.env.JWT_SECRET!

const app = fastify()

app.decorate<FastifyInstance["generateTokens"]>("generateTokens", payload => {
    const access = app.jwt.sign(payload, { expiresIn: TokenTtl.Access })
    const refresh = app.jwt.sign(payload, { expiresIn: TokenTtl.Refresh })
    return { access, refresh }
})
    .decorate<FastifyInstance["getPayload"]>("getPayload", token => {
        try {
            const { iat, exp, ...payload } = app.jwt.verify(token)
            return [payload as Payload, null]
        } catch (err: any) {
            return [null, err]
        }
    })
    .decorate<FastifyInstance["createYupSchema"]>("createYupSchema", createYupSchema)
    .decorate<FastifyAuthFunction>("isAuthorized", async req => req.jwtVerify())
    .decorate<FastifyInstance["hasAccess"]>(
        "hasAccess",
        (...allowedRoles) =>
            async (req, reply, done) => {
                const noAccessError = new MethodNotAllowed("No access")

                const usersRepository = app.orm.getRepository(entities.User)

                const { id } = req.user as Payload
                const user = await usersRepository.findOne(id)

                if (!user) {
                    done(noAccessError)
                    return
                }

                const allowed = hasAccess(user, allowedRoles)
                done(allowed ? undefined : noAccessError)
            }
    )

app.register(typeorm, { ...typeormConfig, entities: Object.values(entities), migrations: [] })
    .register(jwt, { secret: jwtSecret })
    .register(cookie)
    .register(auth)
    .register(socketIo)
    .register(yupSchema)

app.register(routes)

app.listen(port, "0.0.0.0", (err: Error | undefined) => {
    if (err) throw err

    initSockets(app, jwtSecret)

    console.log(`Running on http://localhost:${port}`)
})
