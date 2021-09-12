import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import argon2 from "argon2"
import { User, RefreshToken } from "$/db/entities"

interface LoginData {
    email: string
    password: string
}

const route = ((app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: LoginData }>("/", {
        schema: {
            body: {
                type: "object",
                properties: {
                    email: { type: "string", minLength: 6, maxLength: 64 },
                    password: { type: "string", minLength: 8 }
                },
                required: ["email", "password"]
            }
        },
        async handler(req, reply) {
            const { email, password } = req.body

            const trimmedEmail = email.trim().toLowerCase()

            const user = await usersRepository.findOne({ email: trimmedEmail })

            if (!user) {
                reply.send(new BadRequest("User with such email was not found"))
                return
            }

            const isCorrectPassword = await argon2.verify(user.password, password)

            if (!isCorrectPassword) {
                reply.send(new BadRequest("Incorrect password"))
                return
            }

            const tokens = app.generateTokens({ id: user.id })

            let refreshToken = await refreshTokensRepository.findOne({ user })

            if (!refreshToken) {
                refreshToken = refreshTokensRepository.create()
            }

            refreshToken.token = tokens.refresh
            refreshToken.user = user
            await refreshTokensRepository.save(refreshToken)

            reply
                .setCookie("refreshToken", tokens.refresh, {
                    path: "/",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                })
                .send({ token: tokens.access })
        }
    })

    done()
}) as FastifyPluginCallback

export default route