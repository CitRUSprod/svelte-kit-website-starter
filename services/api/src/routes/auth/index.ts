import { FastifyPluginCallback } from "fastify"
import registrationRoute from "./registration"
import loginRoute from "./login"
import logoutRoute from "./logout"
import refreshRoute from "./refresh"
import userRoute from "./user"
import passwordRoute from "./password"

const route: FastifyPluginCallback = (app, opts, done) => {
    app.register(registrationRoute, { prefix: "/registration" })
        .register(loginRoute, { prefix: "/login" })
        .register(logoutRoute, { prefix: "/logout" })
        .register(refreshRoute, { prefix: "/refresh" })
        .register(userRoute, { prefix: "/user" })
        .register(passwordRoute, { prefix: "/password" })

    done()
}

export default route
