import { FastifyPluginCallback } from "fastify"
import { UserPayload } from "$/types"
import { RefreshToken } from "$/db/entities"

const route = ((app, opts, done) => {
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    app.get("/", async (req, reply) => {
        const oldRefreshToken = req.cookies.refreshToken

        let payload: UserPayload | undefined

        try {
            payload = app.verifyToken(oldRefreshToken)
        } catch (err: unknown) {}

        const refreshToken = await refreshTokensRepository.findOne({ token: oldRefreshToken })

        if (!payload || !refreshToken) {
            reply.code(401).send(new Error("User is not authorized"))
            return
        }

        const tokens = app.generateTokens(payload)

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
