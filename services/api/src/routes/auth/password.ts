import { FastifyPluginCallback } from "fastify"
import { BadRequest, InternalServerError } from "http-errors"
import { User } from "$/db/entities"
import { Payload } from "$/types"

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Params: { id: number }; Body: { oldPassword: string; newPassword: string } }>("/", {
        schema: app.createYupSchema(yup => ({
            params: yup.object({
                id: yup.number().integer().positive()
            }),
            body: yup
                .object({
                    oldPassword: yup.string().trim().min(8).required(),
                    newPassword: yup.string().trim().min(8).required()
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

            const { oldPassword, newPassword } = req.body

            if (oldPassword === newPassword) {
                reply.send(new BadRequest("Old and new passwords match"))
                return
            }

            const isCorrectPassword = await user.verifyPassword(oldPassword)

            if (!isCorrectPassword) {
                reply.send(new BadRequest("Incorrect old password"))
                return
            }

            await user.updatePassword(newPassword)
            await usersRepository.save(user)

            reply.send()
        }
    })

    done()
}

export default route
