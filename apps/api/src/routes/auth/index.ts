import { FastifyPluginCallback } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import { parseByAjvSchema } from "$/utils"
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
                cookies = parseByAjvSchema(schemas.logoutCookies, req.cookies, "cookies")
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
                cookies = parseByAjvSchema(schemas.refreshTokensCookies, req.cookies, "cookies")
            } catch (err: any) {
                throw new UnauthorizedError(err.message)
            }

            const data = await handlers.refreshTokens(app, { cookies })
            await reply.sendData(data)
        }
    })

    done()
}
