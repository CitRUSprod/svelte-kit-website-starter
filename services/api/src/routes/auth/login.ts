import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import argon2 from "argon2"
import { User, RefreshToken } from "$/db/entities"
import { TokenTtl } from "$/enums"

interface LoginData {
    email: string
    password: string
}

const route: FastifyPluginCallback = (app, opts, done) => {
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

            const refreshToken = refreshTokensRepository.create({
                token: tokens.refresh,
                user
            })
            await refreshTokensRepository.save(refreshToken)

            reply
                .setCookie("accessToken", tokens.access, {
                    path: "/",
                    maxAge: TokenTtl.Access
                })
                .setCookie("refreshToken", tokens.refresh, {
                    path: "/",
                    maxAge: TokenTtl.Refresh,
                    httpOnly: true
                })
                .send()
        }
    })

    done()
}

export default route
