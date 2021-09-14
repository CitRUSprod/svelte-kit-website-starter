import { FastifyPluginCallback } from "fastify"
import { Unauthorized } from "http-errors"
import { RefreshToken } from "$/db/entities"

const route: FastifyPluginCallback = (app, opts, done) => {
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    app.post("/", async (req, reply) => {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            reply.send(new Unauthorized("Refresh token is not defined"))
            return
        }

        const refreshTokenFromDb = await refreshTokensRepository.findOne({ token: refreshToken })

        if (!refreshTokenFromDb) {
            reply
                .clearCookie("accessToken")
                .clearCookie("refreshToken")
                .send(new Unauthorized("Refresh token expired"))
            return
        }

        await refreshTokensRepository.remove(refreshTokenFromDb)

        reply.clearCookie("accessToken").clearCookie("refreshToken").send()
    })

    done()
}

export default route
