import type { FastifyInstance, FastifyPluginCallback, preHandlerHookHandler } from "fastify"
import type { FastifyAuthFunction } from "@fastify/auth"

declare module "fastify" {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    interface FastifyInstance {
        createPreHandler(fns: Array<FastifyAuthFunction>, or?: boolean): preHandlerHookHandler
    }
}

export const createPreHandler: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["createPreHandler"]>("createPreHandler", (fns, or = false) =>
        app.auth(fns, {
            relation: or ? "or" : "and"
        })
    )

    done()
}
