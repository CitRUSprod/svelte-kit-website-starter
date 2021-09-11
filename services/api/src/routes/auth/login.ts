import { FastifyPluginCallback } from "fastify"
import argon2 from "argon2"
import { UserPayload } from "$/types"
import { User, RefreshToken } from "$/db/entities"

interface LoginData {
    email: string
    password: string
}

const route = ((app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: LoginData }>("/", async (req, reply) => {
        const { email, password } = req.body

        const trimmedEmail = email.trim().toLowerCase()

        const user = await usersRepository.findOne({ email: trimmedEmail })

        if (!user) {
            reply.code(400).send(new Error("User with such email was not found"))
            return
        }

        const isCorrectPassword = await argon2.verify(user.password, password)

        if (!isCorrectPassword) {
            reply.code(400).send(new Error("Incorrect password"))
            return
        }

        const payload: UserPayload = {
            id: user.id
        }
        const tokens = app.generateTokens(payload)

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
    })

    done()
}) as FastifyPluginCallback

export default route
