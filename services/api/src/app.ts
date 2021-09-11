import fastify from "fastify"
import typeorm from "fastify-typeorm-plugin"
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import auth, { FastifyAuthFunction } from "fastify-auth"
import socketIo from "fastify-socket.io"
import { UserPayload } from "$/types"
import routes from "$/routes"
import * as entities from "$/db/entities"

interface Tokens {
    access: string
    refresh: string
}

declare module "fastify" {
    interface FastifyInstance {
        generateTokens(payload: UserPayload): Tokens
        verifyToken(token: string): UserPayload
        isAuthorized: FastifyAuthFunction
    }
}

const port = 6702

const typeormConfig = JSON.parse(process.env.TYPEORM_CONFIG!)
const jwtSecret = process.env.JWT_SECRET!

const app = fastify()

app.decorate("generateTokens", (payload: UserPayload) => {
    const access = app.jwt.sign(payload, { expiresIn: "15m" })
    const refresh = app.jwt.sign(payload, { expiresIn: "30d" })
    return { access, refresh }
})
    .decorate("verifyToken", (token: string) => {
        const { iat, exp, ...payload } = app.jwt.verify(token)
        return payload
    })
    .decorate("isAuthorized", (async req => req.jwtVerify()) as FastifyAuthFunction)

app.register(typeorm, { ...typeormConfig, entities: Object.values(entities), migrations: [] })
    .register(jwt, { secret: jwtSecret })
    .register(cookie)
    .register(auth)
    .register(socketIo)

app.register(routes)

app.listen(port, "0.0.0.0", (err: Error | undefined) => {
    if (err) throw err

    app.io.on("connection", socket => {
        socket.on("globalChat.join", () => {
            socket.join("globalChat")
        })

        socket.on("globalChat.leave", () => {
            socket.leave("globalChat")
        })

        socket.on("globalChat.send", (data: any) => {
            socket.emit("globalChat.receive", data)
            socket.broadcast.to("globalChat").emit("globalChat.receive", data)
        })
    })

    console.log(`Running on http://localhost:${port}`)
})
