import { FastifyPluginCallback } from "fastify"
import { FindManyOptions, ILike } from "typeorm"
import { BadRequest, InternalServerError, MethodNotAllowed } from "http-errors"
import { Post, User } from "$/db/entities"
import { Role } from "$/enums"
import { Payload, Pagination, Sorting } from "$/types"
import { createPostDto } from "$/dtos"
import { hasAccess, getItemsPage } from "$/utils"

interface Filters {
    title?: string
}

const route: FastifyPluginCallback = (app, opts, done) => {
    const postsRepository = app.orm.getRepository(Post)
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: Pagination & Sorting<"creationDate" | "title"> & Filters }>("/", {
        schema: app.createYupSchema(yup => ({
            querystring: yup.object({
                perPage: yup.number().integer().min(10).max(100).default(10),
                page: yup.number().integer().positive().default(1),
                sort: yup.mixed().oneOf(["creationDate", "title"]).default("creationDate"),
                order: yup
                    .mixed()
                    .transform(v => v.toUpperCase())
                    .oneOf(["ASC", "DESC"])
                    .default("ASC"),
                title: yup.string().trim()
            })
        })),
        async handler(req, reply) {
            const page = await getItemsPage(
                req.query.perPage,
                req.query.page,
                async (skip, take) => {
                    const sorting: FindManyOptions<Post>["order"] = {}
                    sorting[req.query.sort] = req.query.order

                    const filters: FindManyOptions<Post>["where"] = {}
                    // eslint-disable-next-line new-cap
                    if (req.query.title) filters.title = ILike(`%${req.query.title}%`)

                    const itemCount = await postsRepository.count({ where: filters })
                    const posts = await postsRepository.find({
                        relations: ["author"],
                        order: sorting,
                        where: filters,
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
                id: yup.number().integer().positive()
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
                id: yup.number().integer().positive()
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
                id: yup.number().integer().positive()
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
                id: yup.number().integer().positive()
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
