import { FastifyPluginCallback } from "fastify"
import { authRoutes } from "./auth"
import { profileRoutes } from "./profile"
import { usersRoutes } from "./users"
import { rolesRoutes } from "./roles"
import { permissionsRoutes } from "./permissions"
import { postsRoutes } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoutes, { prefix: "/auth" })
        .register(profileRoutes, { prefix: "/profile" })
        .register(permissionsRoutes, { prefix: "/permissions" })
        .register(rolesRoutes, { prefix: "/roles" })
        .register(usersRoutes, { prefix: "/users" })
        .register(postsRoutes, { prefix: "/posts" })

    done()
}
