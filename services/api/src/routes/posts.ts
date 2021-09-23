import { FastifyPluginCallback } from "fastify"
import { BadRequest, InternalServerError, MethodNotAllowed } from "http-errors"
import { Post, User } from "$/db/entities"
import { Role } from "$/enums"
import { Payload } from "$/types"
import { createPostDto } from "$/dtos"
import { hasAccess } from "$/utils"

const route: FastifyPluginCallback = (app, opts, done) => {
    const postsRepository = app.orm.getRepository(Post)
    const usersRepository = app.orm.getRepository(User)

    app.get("/", {
        async handler(req, reply) {
            const posts = await postsRepository.find({
                order: { id: "ASC" },
                relations: ["author"]
            })
            reply.send(posts.map(p => createPostDto(p)))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: { title: string; body: string } }>("/", {
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            },
            body: {
                type: "object",
                properties: {
                    title: { type: "string", minLength: 2, maxLength: 255 },
                    body: { type: "string", minLength: 2 }
                },
                required: ["title", "body"]
            }
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const { id } = req.user as Payload

            const user = await usersRepository.findOne(id)

            if (!user) {
                reply.send(new InternalServerError("User not found"))
                return
            }

            const newPost = postsRepository.create({
                author: user,
                title: req.body.title,
                body: req.body.body
            })
            await postsRepository.save(newPost)
            const post = await postsRepository.findOne(newPost, { relations: ["author"] })

            reply.send(createPostDto(post!))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: { id: number } }>("/:id", {
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            }
        },
        async handler(req, reply) {
            const post = await postsRepository.findOne(req.params.id, { relations: ["author"] })

            if (!post) {
                reply.send(new BadRequest("Post with such ID was not found"))
                return
            }

            reply.send(createPostDto(post))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Params: { id: number }; Body: { title?: string; body?: string } }>("/:id", {
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            },
            body: {
                type: "object",
                properties: {
                    title: { type: "string", minLength: 2, maxLength: 255 },
                    body: { type: "string", minLength: 2 }
                },
                required: ["title", "body"]
            }
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const post = await postsRepository.findOne(req.params.id, { relations: ["author"] })

            if (!post) {
                reply.send(new BadRequest("Post with such ID was not found"))
                return
            }

            const { id } = req.user as Payload

            const user = await usersRepository.findOne(id)

            if (!user) {
                reply.send(new InternalServerError("User not found"))
                return
            }

            if (post.author.id !== user.id && !hasAccess(user, Role.Admin)) {
                reply.send(new MethodNotAllowed("No access"))
                return
            }

            if (req.body.title) post.title = req.body.title
            if (req.body.body) post.body = req.body.body
            post.editedAt = new Date()
            await postsRepository.save(post)

            reply.send(createPostDto(post))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.delete<{ Params: { id: number } }>("/:id", {
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            }
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const post = await postsRepository.findOne(req.params.id, { relations: ["author"] })

            if (!post) {
                reply.send(new BadRequest("Post with such ID was not found"))
                return
            }

            const { id } = req.user as Payload

            const user = await usersRepository.findOne(id)

            if (!user) {
                reply.send(new InternalServerError("User not found"))
                return
            }

            if (post.author.id !== user.id && !hasAccess(user, Role.Admin)) {
                reply.send(new MethodNotAllowed("No access"))
                return
            }

            await postsRepository.remove(post)

            reply.send()
        }
    })

    done()
}

export default route
