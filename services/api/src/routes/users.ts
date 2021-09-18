import { FastifyPluginCallback } from "fastify"
import { User } from "$/db/entities"
import { Role } from "$/enums"
import { createUserDto } from "$/dtos"

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    app.get("/", {
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req, reply) {
            const users = await usersRepository.find()
            reply.send(users.map(u => createUserDto(u)))
        }
    })

    done()
}

export default route
