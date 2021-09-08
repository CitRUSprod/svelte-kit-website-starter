import { FastifyPluginCallback } from "fastify"
import registerRoute from "./register"
import loginRoute from "./login"
import logoutRoute from "./logout"

const route = ((app, opts, next) => {
    app.register(registerRoute, { prefix: "/register" })
        .register(loginRoute, { prefix: "/login" })
        .register(logoutRoute, { prefix: "/logout" })

    next()
}) as FastifyPluginCallback

export default route
