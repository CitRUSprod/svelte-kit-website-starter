import { FastifyPluginCallback } from "fastify"
import { authRoutes } from "./auth"
import { profileRoutes } from "./profile"
import { usersRoutes } from "./users"
import { rolesRoutes } from "./roles"
import { permissionsRoutes } from "./permissions"
import { postsRoutes } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoutes)
        .register(profileRoutes)
        .register(permissionsRoutes)
        .register(rolesRoutes)
        .register(usersRoutes)
        .register(postsRoutes)

    done()
}
