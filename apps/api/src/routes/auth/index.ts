import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"
import type { FastifyPluginCallback } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"

import * as handlers from "./handlers"

export const authRoutes: FastifyPluginCallback = (app, options, done) => {
    app.post<{ Body: schemasRoutes.auth.RegisterBody }>(constantsRoutes.auth.register, {
        schema: {
            tags: [constantsRoutes.auth.base],
            body: schemasRoutes.auth.registerBody()
        },
        async handler(req, reply) {
            const data = await handlers.register(app, req)
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
            const data = await handlers.completeRegistration(app, req)
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
            const data = await handlers.oAuthRegister(app, req)
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.auth.LoginBody }>(constantsRoutes.auth.login, {
        schema: {
            tags: [constantsRoutes.auth.base],
            body: schemasRoutes.auth.loginBody()
        },
        async handler(req, reply) {
            const data = await handlers.login(app, req)
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemasRoutes.auth.OAuthLoginParams }>(constantsRoutes.auth.oAuthLogin, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.oAuthLoginParams()
        },
        async handler(req, reply) {
            const data = await handlers.oAuthLogin(app, req)
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

            const data = await handlers.oAuthLoginCallback(app, req, cookies)
            await reply.sendData(data)
        }
    })

    app.post<{
        Body: schemasRoutes.auth.LinkBody
    }>(constantsRoutes.auth.link, {
        schema: {
            tags: [constantsRoutes.auth.base],
            body: schemasRoutes.auth.linkBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            const data = await handlers.link(app, req)

            await reply.sendData(data)
        }
    })

    app.post<{
        Params: schemasRoutes.auth.CompleteLinkingParams
    }>(constantsRoutes.auth.completeLinking, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.completeLinkingParams()
        },
        async handler(req, reply) {
            const data = await handlers.completeLinking(app, req)

            await reply.sendData(data)
        }
    })

    app.post(constantsRoutes.auth.unlink, {
        schema: {
            tags: [constantsRoutes.auth.base]
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            const data = await handlers.unlink(app, req)

            await reply.sendData(data)
        }
    })

    app.post<{
        Params: schemasRoutes.auth.CompleteUnlinkingParams
    }>(constantsRoutes.auth.completeUnlinking, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.completeUnlinkingParams()
        },
        async handler(req, reply) {
            const data = await handlers.completeUnlinking(app, req)

            await reply.sendData(data)
        }
    })

    app.post<{
        Params: schemasRoutes.auth.OAuthLinkCallbackParams
        Body: schemasRoutes.auth.OAuthLinkCallbackBody
    }>(constantsRoutes.auth.oAuthLinkCallback, {
        schema: {
            tags: [constantsRoutes.auth.base],
            params: schemasRoutes.auth.oAuthLinkCallbackParams(),
            body: schemasRoutes.auth.oAuthLinkCallbackBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            let cookies: schemasRoutes.auth.OAuthLinkCallbackCookies

            try {
                cookies = schemasRoutes.auth.oAuthLinkCallbackCookies().parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.oAuthLinkCallback(app, req, cookies)

            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemasRoutes.auth.OAuthUnlinkParams }>(constantsRoutes.auth.oAuthUnlink, {
        schema: {
            tags: [constantsRoutes.auth.base]
        },
        async handler(req, reply) {
            const data = await handlers.oAuthUnlink(app, req)
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

            const data = await handlers.logout(app, req, cookies)
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

            const data = await handlers.refreshTokens(app, req, cookies)
            await reply.sendData(data)
        }
    })

    done()
}
