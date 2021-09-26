import { FastifyPluginCallback } from "fastify"
import { FindManyOptions, ILike } from "typeorm"
import { BadRequest } from "http-errors"
import { User } from "$/db/entities"
import { Role } from "$/enums"
import { Pagination, Sorting } from "$/types"
import { createUserDto } from "$/dtos"
import { getItemsPage } from "$/utils"

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
                    const items = users.map(u => createUserDto(u))
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

            reply.send(createUserDto(user))
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Params: { id: number }; Body: { role: Role } }>("/:id", {
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().positive()
            }),
            body: yup
                .object({
                    role: yup.mixed().oneOf(Object.values(Role)).required()
                })
                .required()
        })),
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req, reply) {
            const user = await usersRepository.findOne(req.params.id)

            if (!user) {
                reply.send(new BadRequest("User with such ID was not found"))
                return
            }

            user.role = req.body.role
            await usersRepository.save(user)

            reply.send(createUserDto(user))
        }
    })

    done()
}

export default route
