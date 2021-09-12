import { FastifyPluginCallback } from "fastify"
import { InternalServerError } from "http-errors"
import { Payload } from "$/types"
import { User } from "$/db/entities"
import { createUserDto } from "$/dtos"

const route = ((app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    app.get("/", {
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const { id } = req.user as Payload

            const user = await usersRepository.findOne(id)

            if (!user) {
                reply.send(new InternalServerError("User not found"))
                return
            }

            reply.send(createUserDto(user))
        }
    })

    done()
}) as FastifyPluginCallback

export default route
