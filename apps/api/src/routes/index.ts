import { FastifyPluginCallback } from "fastify"
import * as common from "$/common"
import { authRoutes } from "./auth"
import { profileRoutes } from "./profile"
import { usersRoutes } from "./users"
import { rolesRoutes } from "./roles"
import { permissionsRoutes } from "./permissions"
import { postsRoutes } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoutes, { prefix: common.auth.basePath })
        .register(profileRoutes, { prefix: common.profile.basePath })
        .register(permissionsRoutes, { prefix: common.permissions.basePath })
        .register(rolesRoutes, { prefix: common.roles.basePath })
        .register(usersRoutes, { prefix: common.users.basePath })
        .register(postsRoutes, { prefix: common.posts.basePath })

    done()
}
