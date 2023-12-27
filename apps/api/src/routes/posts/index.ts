import { FastifyPluginCallback } from "fastify"
import * as common from "$/common"
import * as handlers from "./handlers"

export const postsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: common.posts.GetPostsQuery }>(common.posts.getPostsPath, {
        schema: {
            tags: [common.posts.basePath],
            querystring: common.posts.getPostsQuerySchema()
        },
        async handler(req, reply) {
            const data = await handlers.getPosts(app, { query: req.query })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.posts.CreatePostBody }>(common.posts.createPostPath, {
        schema: {
            tags: [common.posts.basePath],
            body: common.posts.createPostBodySchema()
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

    app.get<{ Params: common.posts.GetPostParams }>(common.posts.getPostPath, {
        schema: {
            tags: [common.posts.basePath],
            params: common.posts.getPostParamsSchema()
        },
        async handler(req, reply) {
            const data = await handlers.getPost(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.patch<{ Params: common.posts.UpdatePostParams; Body: common.posts.UpdatePostBody }>(
        common.posts.updatePostPath,
        {
            schema: {
                tags: [common.posts.basePath],
                params: common.posts.updatePostParamsSchema(),
                body: common.posts.updatePostBodySchema()
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
        }
    )

    app.delete<{ Params: common.posts.DeletePostParams }>(common.posts.deletePostPath, {
        schema: {
            tags: [common.posts.basePath],
            params: common.posts.deletePostParamsSchema()
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
