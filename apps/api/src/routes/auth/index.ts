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

    app.post<{
        Params: schemasRoutes.auth.CompleteRegistrationParams
    }>(constantsRoutes.auth.completeRegistration, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.completeRegistrationParams()
        },
        async handler(req, reply) {
            const data = await handlers.completeRegistration(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{
        Params: schemasRoutes.auth.OAuthRegisterParams
        Body: schemasRoutes.auth.OAuthRegisterBody
    }>(constantsRoutes.auth.oAuthRegister, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.oAuthRegisterParams(),
            body: schemasRoutes.auth.oAuthRegisterBody()
        },
        async handler(req, reply) {
            const data = await handlers.oAuthRegister(app, { params: req.params, body: req.body })
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

    app.post<{ Params: schemasRoutes.auth.OAuthLoginParams }>(constantsRoutes.auth.oAuthLogin, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.oAuthLoginParams()
        },
        async handler(req, reply) {
            const data = await handlers.oAuthLogin(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{
        Params: schemasRoutes.auth.OAuthLoginCallbackParams
        Body: schemasRoutes.auth.OAuthLoginCallbackBody
    }>(constantsRoutes.auth.oAuthLoginCallback, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.oAuthLoginCallbackParams(),
            body: schemasRoutes.auth.oAuthLoginCallbackBody()
        },
        async handler(req, reply) {
            let cookies: schemasRoutes.auth.OAuthLoginCallbackCookies

            try {
                cookies = schemasRoutes.auth.oAuthLoginCallbackCookies().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.oAuthLoginCallback(app, {
                cookies,
                params: req.params,
                body: req.body
            })
            await reply.sendData(data as any)
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
