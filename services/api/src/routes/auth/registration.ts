import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import argon2 from "argon2"
import { User } from "$/db/entities"

interface RegistrationData {
    email: string
    username: string
    password: string
}

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: RegistrationData }>("/", {
        schema: app.createYupSchema(yup => ({
            body: yup
                .object({
                    email: yup.string().trim().lowercase().min(6).max(64).email().required(),
                    username: yup.string().trim().min(3).max(64).required(),
                    password: yup.string().trim().min(8).required()
                })
                .required()
        })),
        async handler(req, reply) {
            const { email, username, password } = req.body

            const trimmedEmail = email.trim().toLowerCase()
            const trimmedUsername = username.trim()

            const userByEmail = await usersRepository.findOne({ email: trimmedEmail })

            if (userByEmail) {
                reply.send(new BadRequest("A user with this email already exists"))
                return
            }

            const userByUsername = await usersRepository.findOne({ username: trimmedUsername })

            if (userByUsername) {
                reply.send(new BadRequest("A user with this username already exists"))
                return
            }

            const passwordHash = await argon2.hash(password)

            const user = usersRepository.create({
                email: trimmedEmail,
                username: trimmedUsername,
                password: passwordHash
            })

            await usersRepository.save(user)

            reply.send()
        }
    })

    done()
}

export default route
