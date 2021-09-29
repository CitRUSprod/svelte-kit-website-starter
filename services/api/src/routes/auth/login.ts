import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import { User, RefreshToken } from "$/db/entities"
import { TokenTtl } from "$/enums"
import { validators as vld } from "$/utils"

interface LoginData {
    email: string
    password: string
}

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: LoginData }>("/", {
        schema: app.createYupSchema(yup => ({
            body: yup
                .object({
                    email: yup
                        .string()
                        .trim()
                        .lowercase()
                        .max(64)
                        .test(v => vld.isEmail(v!))
                        .required(),
                    password: yup.string().trim().min(8).required()
                })
                .required()
        })),
        async handler(req, reply) {
            const { email, password } = req.body

            const user = await usersRepository.findOne({ email })

            if (!user) {
                reply.send(new BadRequest("User with such email was not found"))
                return
            }

            const isCorrectPassword = await user.verifyPassword(password)

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
