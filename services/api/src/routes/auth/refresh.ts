import { FastifyPluginCallback } from "fastify"
import { Unauthorized, InternalServerError } from "http-errors"
import { RefreshToken } from "$/db/entities"

const route = ((app, opts, done) => {
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    app.get("/", async (req, reply) => {
        const oldRefreshToken = req.cookies.refreshToken

        if (!oldRefreshToken) {
            reply.send(new Unauthorized("Refresh token is not defined"))
            return
        }

        const [payload, err] = app.getPayload(oldRefreshToken)

        if (err) {
            switch (err.name) {
                case "TokenExpiredError": {
                    reply.send(new Unauthorized("Refresh token expired"))
                    return
                }

                case "JsonWebTokenError": {
                    reply.send(new Unauthorized("Refresh token is invalid"))
                    return
                }
            }

            reply.send(new InternalServerError(`Unexpected error: ${err.message}`))
            return
        }

        const refreshToken = await refreshTokensRepository.findOne({ token: oldRefreshToken })

        if (!refreshToken) {
            reply.send(new Unauthorized("Refresh token expired"))
            return
        }

        const tokens = app.generateTokens(payload!)

        refreshToken.token = tokens.refresh
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
