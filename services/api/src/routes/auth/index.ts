import { FastifyPluginCallback } from "fastify"
import registrationRoute from "./registration"
import loginRoute from "./login"
import logoutRoute from "./logout"
import refreshRoute from "./refresh"
import userRoute from "./user"

const route = ((app, opts, done) => {
    app.register(registrationRoute, { prefix: "/registration" })
        .register(loginRoute, { prefix: "/login" })
        .register(logoutRoute, { prefix: "/logout" })
        .register(refreshRoute, { prefix: "/refresh" })
        .register(userRoute, { prefix: "/user" })

    done()
}) as FastifyPluginCallback

export default route
