import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"
import type { FastifyPluginCallback } from "fastify"

import * as handlers from "./handlers"

export const postsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: schemasRoutes.posts.GetPostsQuery }>(constantsRoutes.posts.getPosts, {
        schema: {
            tags: [constantsRoutes.posts.base],
            querystring: schemasRoutes.posts.getPostsQuery()
        },
        async handler(req, reply) {
            const data = await handlers.getPosts(app, req)
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.posts.CreatePostBody }>(constantsRoutes.posts.createPost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            body: schemasRoutes.posts.createPostBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            const data = await handlers.createPost(app, req)
            await reply.sendData(data)
        }
    })

    app.get<{ Params: schemasRoutes.posts.GetPostParams }>(constantsRoutes.posts.getPost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            params: schemasRoutes.posts.getPostParams()
        },
        async handler(req, reply) {
            const data = await handlers.getPost(app, req)
            await reply.sendData(data)
        }
    })

    app.patch<{
        Params: schemasRoutes.posts.UpdatePostParams
        Body: schemasRoutes.posts.UpdatePostBody
    }>(constantsRoutes.posts.updatePost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            params: schemasRoutes.posts.updatePostParams(),
            body: schemasRoutes.posts.updatePostBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            const data = await handlers.updatePost(app, req)
            await reply.sendData(data)
        }
    })

    app.delete<{ Params: schemasRoutes.posts.DeletePostParams }>(constantsRoutes.posts.deletePost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            params: schemasRoutes.posts.deletePostParams()
        },
        preHandler: app.createPreHandler([app.verifyAuth, app.verifyNotBanned]),
        async handler(req, reply) {
            const data = await handlers.deletePost(app, req)
            await reply.sendData(data)
        }
    })

    done()
}
