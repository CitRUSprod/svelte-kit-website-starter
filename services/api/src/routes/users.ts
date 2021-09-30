import { FastifyPluginCallback } from "fastify"
import { FindManyOptions, ILike } from "typeorm"
import { BadRequest, MethodNotAllowed, InternalServerError } from "http-errors"
import { User } from "$/db/entities"
import { Role } from "$/enums"
import { Payload, Pagination, Sorting } from "$/types"
import { dtos, vld, hasAccess, getItemsPage } from "$/utils"

interface Filters {
    email?: string
    username?: string
}

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: Pagination & Sorting<"registrationDate" | "username"> & Filters }>("/", {
        schema: app.createYupSchema(yup => ({
            querystring: yup.object({
                perPage: yup.number().integer().min(10).max(100).default(10),
                page: yup.number().integer().positive().default(1),
                sort: yup
                    .mixed()
                    .oneOf(["registrationDate", "username"])
                    .default("registrationDate"),
                order: yup
                    .mixed()
                    .transform(v => v.toUpperCase())
                    .oneOf(["ASC", "DESC"])
                    .default("ASC"),
                email: yup.string().trim(),
                username: yup.string().trim()
            })
        })),
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req, reply) {
            const page = await getItemsPage(
                req.query.perPage,
                req.query.page,
                async (skip, take) => {
                    const sorting: FindManyOptions<User>["order"] = {}
                    sorting[req.query.sort] = req.query.order

                    const filters: FindManyOptions<User>["where"] = {}
                    // eslint-disable-next-line new-cap
                    if (req.query.email) filters.email = ILike(`%${req.query.email}%`)
                    // eslint-disable-next-line new-cap
                    if (req.query.username) filters.username = ILike(`%${req.query.username}%`)

                    const itemCount = await usersRepository.count({ where: filters })
                    const users = await usersRepository.find({
                        order: sorting,
                        where: filters,
                        skip,
                        take
                    })
                    const items = users.map(u => dtos.user(u))
                    return { itemCount, items }
                }
            )

            reply.send(page)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: { id: number } }>("/:id", {
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().positive()
            })
        })),
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const user = await usersRepository.findOne(req.params.id)

            if (!user) {
                reply.send(new BadRequest("User with such ID was not found"))
                return
            }

            reply.send(dtos.user(user))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Params: { id: number }; Body: { email?: string; username?: string; role?: Role } }>(
        "/:id",
        {
            schema: app.createYupSchema(yup => ({
                params: yup.object({
                    id: yup.number().integer().positive()
                }),
                body: yup
                    .object({
                        email: yup
                            .string()
                            .trim()
                            .lowercase()
                            .max(64)
                            .test(v => vld.isEmail(v!)),
                        username: yup
                            .string()
                            .trim()
                            .min(3)
                            .max(32)
                            .test(v => vld.isWordChars(v!)),
                        role: yup.mixed().oneOf(Object.values(Role))
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

                if (user.id !== req.params.id && !hasAccess(user, Role.Admin)) {
                    reply.send(new MethodNotAllowed("No access"))
                    return
                }

                const editableUser = await usersRepository.findOne(req.params.id)

                if (!editableUser) {
                    reply.send(new BadRequest("User with such ID was not found"))
                    return
                }

                const { email, username, role } = req.body

                if (email && email !== editableUser.email) {
                    const userByEmail = await usersRepository.findOne({ email })

                    if (userByEmail) {
                        reply.send(new BadRequest("A user with this email already exists"))
                        return
                    }
                }

                if (username && username !== editableUser.username) {
                    const userByUsername = await usersRepository.findOne({ username })

                    if (userByUsername) {
                        reply.send(new BadRequest("A user with this username already exists"))
                        return
                    }
                }

                if (email && email !== editableUser.email) {
                    editableUser.email = email
                    editableUser.verified = false
                }

                if (username) editableUser.username = username
                if (role && hasAccess(user, Role.Admin)) editableUser.role = role
                await usersRepository.save(editableUser)

                reply.send(dtos.user(editableUser))
            }
        }
    )

    done()
}

export default route
