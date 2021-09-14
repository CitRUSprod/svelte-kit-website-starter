import { FastifyPluginCallback } from "fastify"
import authRoute from "./auth"
import usersRoute from "./users"

const route: FastifyPluginCallback = (app, opts, done) => {
    app.register(authRoute, { prefix: "/auth" })
    app.register(usersRoute, { prefix: "/users" })

    done()
}

export default route
