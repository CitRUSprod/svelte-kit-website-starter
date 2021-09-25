import { FastifyPluginCallback } from "fastify"
import { BadRequest, InternalServerError, MethodNotAllowed } from "http-errors"
import { Post, User } from "$/db/entities"
import { Role } from "$/enums"
import { Payload } from "$/types"
import { createPostDto } from "$/dtos"
import { hasAccess, getItemsPage } from "$/utils"

const route: FastifyPluginCallback = (app, opts, done) => {
    const postsRepository = app.orm.getRepository(Post)
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: { perPage: number; page: number } }>("/", {
        schema: app.createYupSchema(yup => ({
            querystring: yup.object({
                perPage: yup.number().integer().min(10).max(100),
                page: yup.number().integer().min(1)
            })
        })),
        async handler(req, reply) {
            const page = await getItemsPage(
                req.query.perPage,
                req.query.page,
                async (skip, take) => {
                    const itemCount = await postsRepository.count()
                    const posts = await postsRepository.find({
                        order: { id: "ASC" },
                        relations: ["author"],
                        skip,
                        take
                    })
                    const items = posts.map(p => createPostDto(p))
                    return { itemCount, items }
                }
            )

            reply.send(page)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: { title: string; body: string } }>("/", {
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().min(1)
            }),
            body: yup
                .object({
                    title: yup.string().trim().min(2).max(255).required(),
                    body: yup.string().trim().min(2).required()
                })
                .required()
        })),
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
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().min(1)
            })
        })),
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
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().min(1)
            }),
            body: yup
                .object({
                    title: yup.string().trim().min(2).max(255).required(),
                    body: yup.string().trim().min(2).required()
                })
                .required()
        })),
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
            await postsRepository.save(post)

            reply.send(createPostDto(post))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.delete<{ Params: { id: number } }>("/:id", {
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().min(1)
            })
        })),
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
