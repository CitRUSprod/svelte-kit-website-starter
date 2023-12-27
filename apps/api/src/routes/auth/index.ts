import { FastifyPluginCallback } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import * as common from "$/common"
import * as handlers from "./handlers"

export const authRoutes: FastifyPluginCallback = (app, options, done) => {
    app.post<{ Body: common.auth.RegisterBody }>(common.auth.registerPath, {
        schema: {
            tags: [common.auth.basePath],
            body: common.auth.registerBodySchema()
        },
        async handler(req, reply) {
            const data = await handlers.register(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.auth.LoginBody }>(common.auth.loginPath, {
        schema: {
            tags: [common.auth.basePath],
            body: common.auth.loginBodySchema()
        },
        async handler(req, reply) {
            const data = await handlers.login(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post(common.auth.logoutPath, {
        schema: {
            tags: [common.auth.basePath]
        },
        async handler(req, reply) {
            let cookies: common.auth.LogoutCookies

            try {
                cookies = common.auth.logoutCookiesSchema().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.logout(app, { cookies })
            await reply.sendData(data)
        }
    })

    app.post(common.auth.refreshPath, {
        schema: {
            tags: [common.auth.basePath]
        },
        async handler(req, reply) {
            let cookies: common.auth.RefreshTokensCookies

            try {
                cookies = common.auth.refreshTokensCookiesSchema().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.refreshTokens(app, { cookies })
            await reply.sendData(data)
        }
    })

    done()
}
