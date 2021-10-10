import { FastifyPluginCallback } from "fastify"
import { MoreThan } from "typeorm"
import { BadRequest, InternalServerError } from "http-errors"
import { v4 as createUuid } from "uuid"
import { User, ResetToken } from "$/db/entities"
import { Payload } from "$/types"
import { sendMail } from "$/utils"

const websiteDomain = process.env.WEBSITE_DOMAIN!

const route: FastifyPluginCallback = (app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)
    const resetTokensRepository = app.orm.getRepository(ResetToken)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.put<{ Body: { oldPassword: string; newPassword: string } }>("/", {
        schema: app.createYupSchema(yup => ({
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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: { email: string } }>("/", {
        schema: app.createYupSchema(yup => ({
            body: yup
                .object({
                    email: yup.string().trim().lowercase().max(64).email().required()
                })
                .required()
        })),
        async handler(req, reply) {
            const user = await usersRepository.findOne({ email: req.body.email })

            if (!user) {
                reply.send(new BadRequest("User with such email was not found"))
                return
            }

            let resetToken = await resetTokensRepository.findOne({ user })

            if (!resetToken) {
                resetToken = resetTokensRepository.create({ user })
            }

            resetToken.token = createUuid()
            await resetTokensRepository.save(resetToken)

            const subject = "Password reset"
            const message = `
                <h3>Dear ${user.username}</h3>
                <div>
                    <a href="http://${websiteDomain}/auth/reset/${resetToken.token}">Reset password</a>
                </div>
            `
            await sendMail(user.email, subject, message)

            reply.send()
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Body: { token: string; password: string } }>("/", {
        schema: app.createYupSchema(yup => ({
            body: yup
                .object({
                    token: yup.string().trim().length(36).required(),
                    password: yup.string().trim().min(8).required()
                })
                .required()
        })),
        async handler(req, reply) {
            const resetToken = await resetTokensRepository.findOne({
                relations: ["user"],
                where: {
                    token: req.body.token,
                    // eslint-disable-next-line new-cap
                    expirationDate: MoreThan(new Date())
                }
            })

            if (!resetToken) {
                reply.send(new BadRequest("Reset token expired"))
                return
            }

            const { user } = resetToken
            await user.updatePassword(req.body.password)
            await usersRepository.save(user)

            await resetTokensRepository.remove(resetToken)

            reply.send()
        }
    })

    done()
}

export default route
