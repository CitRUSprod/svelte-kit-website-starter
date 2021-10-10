import { FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import { User } from "$/db/entities"
import { vld } from "$/utils"

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
                    email: yup.string().trim().lowercase().max(64).email().required(),
                    username: yup
                        .string()
                        .trim()
                        .min(3)
                        .max(32)
                        .test(v => vld.isWordChars(v!))
                        .required(),
                    password: yup.string().trim().min(8).required()
                })
                .required()
        })),
        async handler(req, reply) {
            const { email, username, password } = req.body

            const userByEmail = await usersRepository.findOne({ email })

            if (userByEmail) {
                reply.send(new BadRequest("A user with this email already exists"))
                return
            }

            const userByUsername = await usersRepository.findOne({ username })

            if (userByUsername) {
                reply.send(new BadRequest("A user with this username already exists"))
                return
            }

            const user = usersRepository.create({ email, username, password })
            await usersRepository.save(user)

            reply.send()
        }
    })

    done()
}

export default route
