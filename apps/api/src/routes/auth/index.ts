import { FastifyPluginCallback } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import * as handlers from "./handlers"

export const authRoutes: FastifyPluginCallback = (app, options, done) => {
    app.post<{ Body: schemasRoutes.auth.RegisterBody }>(constantsRoutes.auth.register, {
        schema: {
            tags: [constantsRoutes.auth.base],
            body: schemasRoutes.auth.registerBody()
        },
        async handler(req, reply) {
            const data = await handlers.register(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.auth.LoginBody }>(constantsRoutes.auth.login, {
        schema: {
            tags: [constantsRoutes.auth.base],
            body: schemasRoutes.auth.loginBody()
        },
        async handler(req, reply) {
            const data = await handlers.login(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post(constantsRoutes.auth.logout, {
        schema: {
            tags: [constantsRoutes.auth.base]
        },
        async handler(req, reply) {
            let cookies: schemasRoutes.auth.LogoutCookies

            try {
                cookies = schemasRoutes.auth.logoutCookies().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.logout(app, { cookies })
            await reply.sendData(data)
        }
    })

    app.post(constantsRoutes.auth.refreshTokens, {
        schema: {
            tags: [constantsRoutes.auth.base]
        },
        async handler(req, reply) {
            let cookies: schemasRoutes.auth.RefreshTokensCookies

            try {
                cookies = schemasRoutes.auth.refreshTokensCookies().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.refreshTokens(app, { cookies })
            await reply.sendData(data)
        }
    })

    done()
}
