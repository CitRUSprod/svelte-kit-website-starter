import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import { User } from "$/db/entities"
import { Role } from "$/enums"
import { createUserDto } from "$/dtos"
import { getItemsPage } from "$/utils"

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: { perPage: number; page: number } }>("/", {
        schema: {
            querystring: {
                type: "object",
                properties: {
                    perPage: { type: "integer", minimum: 10 },
                    page: { type: "integer", minimum: 1 }
                }
            }
        },
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req, reply) {
            const page = await getItemsPage(
                req.query.perPage,
                req.query.page,
                async (skip, take) => {
                    const itemCount = await usersRepository.count()
                    const users = await usersRepository.find({
                        order: { id: "ASC" },
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
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            }
        },
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
        schema: {
            params: {
                id: { type: "integer", minimum: 1 }
            },
            body: {
                type: "object",
                properties: {
                    role: { enum: Object.values(Role) }
                },
                required: ["role"]
            }
        },
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
