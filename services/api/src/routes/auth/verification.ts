import { FastifyPluginCallback } from "fastify"
import { MoreThan } from "typeorm"
import { BadRequest, InternalServerError } from "http-errors"
import { v4 as createUuid } from "uuid"
import { User, VerificationToken } from "$/db/entities"
import { Payload } from "$/types"
import { sendMail } from "$/utils"

const websiteDomain = process.env.WEBSITE_DOMAIN!

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)
    const verificationTokensRepository = app.orm.getRepository(VerificationToken)

    app.post("/", {
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const { id } = req.user as Payload

            const user = await usersRepository.findOne(id)

            if (!user) {
                reply.send(new InternalServerError("User not found"))
                return
            }

            if (user.verified) {
                reply.send(new BadRequest("Email is already verified"))
                return
            }

            let verificationToken = await verificationTokensRepository.findOne({ user })

            if (!verificationToken) {
                verificationToken = verificationTokensRepository.create({ user })
            }

            verificationToken.token = createUuid()
            await verificationTokensRepository.save(verificationToken)

            const subject = "Email confirmation"
            const message = `
                <h3>Dear ${user.username}</h3>
                <div>
                    <a href="http://${websiteDomain}/auth/verification/${verificationToken.token}">Confirm Email</a>
                </div>
            `
            await sendMail(user.email, subject, message)

            reply.send()
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Body: { token: string } }>("/", {
        schema: app.createYupSchema(yup => ({
            body: yup
                .object({
                    token: yup.string().trim().length(36).required()
                })
                .required()
        })),
        async handler(req, reply) {
            const verificationToken = await verificationTokensRepository.findOne({
                relations: ["user"],
                where: {
                    token: req.body.token,
                    // eslint-disable-next-line new-cap
                    expirationDate: MoreThan(new Date())
                }
            })

            if (!verificationToken) {
                reply.send(new BadRequest("Verification token expired"))
                return
            }

            const { user } = verificationToken
            user.verified = true
            await usersRepository.save(user)

            await verificationTokensRepository.remove(verificationToken)

            reply.send()
        }
    })

    done()
}

export default route
