import type { FastifyPluginCallback } from "fastify"

import { authRoutes } from "./auth"
import { postsRoutes } from "./posts"
import { profileRoutes } from "./profile"
import { rolesRoutes } from "./roles"
import { temporaryStorageRoutes } from "./temporary-storage"
import { usersRoutes } from "./users"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(temporaryStorageRoutes)
        .register(authRoutes)
        .register(profileRoutes)
        .register(rolesRoutes)
        .register(usersRoutes)
        .register(postsRoutes)

    done()
}
