import { FastifyPluginCallback } from "fastify"
import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import * as handlers from "./handlers"

export const postsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: schemasRoutes.posts.GetPostsQuery }>(constantsRoutes.posts.getPosts, {
        schema: {
            tags: [constantsRoutes.posts.base],
            querystring: schemasRoutes.posts.getPostsQuery()
        },
        async handler(req, reply) {
            const data = await handlers.getPosts(app, { query: req.query })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.posts.CreatePostBody }>(constantsRoutes.posts.createPost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            body: schemasRoutes.posts.createPostBody()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyNotBanned
        ]),
        async handler(req, reply) {
            const data = await handlers.createPost(app, { userData: req.userData!, body: req.body })
            await reply.sendData(data)
        }
    })

    app.get<{ Params: schemasRoutes.posts.GetPostParams }>(constantsRoutes.posts.getPost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            params: schemasRoutes.posts.getPostParams()
        },
        async handler(req, reply) {
            const data = await handlers.getPost(app, { params: req.params })
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
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyNotBanned
        ]),
        async handler(req, reply) {
            const data = await handlers.updatePost(app, {
                userData: req.userData!,
                params: req.params,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    app.delete<{ Params: schemasRoutes.posts.DeletePostParams }>(constantsRoutes.posts.deletePost, {
        schema: {
            tags: [constantsRoutes.posts.base],
            params: schemasRoutes.posts.deletePostParams()
        },
        preHandler: app.createPreHandler([
            app.setUserData,
            app.verifyAuth,
            app.verifyConfirmedEmail,
            app.verifyNotBanned
        ]),
        async handler(req, reply) {
            const data = await handlers.deletePost(app, {
                userData: req.userData!,
                params: req.params
            })
            await reply.sendData(data)
        }
    })

    done()
}
