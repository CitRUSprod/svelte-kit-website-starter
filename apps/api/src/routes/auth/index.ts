import { FastifyPluginCallback } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const authRoutes: FastifyPluginCallback = (app, options, done) => {
    app.post<{ Body: schemas.RegisterBody }>("/register", {
        schema: {
            tags: ["auth"],
            body: schemas.registerBody
        },
        async handler(req, reply) {
            const data = await handlers.register(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.LoginBody }>("/login", {
        schema: {
            tags: ["auth"],
            body: schemas.loginBody
        },
        async handler(req, reply) {
            const data = await handlers.login(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post("/logout", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            let cookies: schemas.LogoutCookies

            try {
                cookies = schemas.logoutCookies.parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.logout(app, { cookies })
            await reply.sendData(data)
        }
    })

    app.post("/refresh", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            let cookies: schemas.RefreshTokensCookies

            try {
                cookies = schemas.refreshTokensCookies.parse(req.cookies)
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.refreshTokens(app, { cookies })
            await reply.sendData(data)
        }
    })

    done()
}
