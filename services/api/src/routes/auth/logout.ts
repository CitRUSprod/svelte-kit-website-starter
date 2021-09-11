import { FastifyPluginCallback } from "fastify"
import { RefreshToken } from "$/db/entities"

const route = ((app, opts, done) => {
    const refreshTokensRepository = app.orm.getRepository(RefreshToken)

    app.post("/", async (req, reply) => {
        const { refreshToken } = req.cookies

        await refreshTokensRepository.delete({ token: refreshToken })

        reply.clearCookie("refreshToken").send()
    })

    done()
}) as FastifyPluginCallback

export default route
