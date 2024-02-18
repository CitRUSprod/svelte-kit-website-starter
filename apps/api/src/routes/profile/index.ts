import { FastifyPluginCallback } from "fastify"
import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import * as handlers from "./handlers"

export const profileRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(constantsRoutes.profile.getUser, {
        schema: {
            tags: [constantsRoutes.profile.base]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.getUser(app, { userData: req.userData! })
            await reply.sendData(data)
        }
    })

    app.patch<{ Body: schemasRoutes.profile.UpdateUserBody }>(constantsRoutes.profile.updateUser, {
        schema: {
            tags: [constantsRoutes.profile.base],
            body: schemasRoutes.profile.updateUserBody()
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.updateUser(app, { userData: req.userData!, body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.profile.UploadAvatarBody }>(
        constantsRoutes.profile.uploadAvatar,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                body: schemasRoutes.profile.uploadAvatarBody()
            },
            preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.uploadAvatar(app, {
                    userData: req.userData!,
                    body: req.body
                })
                await reply.sendData(data)
            }
        }
    )

    app.delete(constantsRoutes.profile.deleteAvatar, {
        schema: {
            tags: [constantsRoutes.profile.base]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.deleteAvatar(app, {
                userData: req.userData!
            })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemasRoutes.profile.SendEmailUpdateEmailToOldBody }>(
        constantsRoutes.profile.sendEmailUpdateEmailToOld,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                body: schemasRoutes.profile.sendEmailUpdateEmailToOldBody()
            },
            preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.sendEmailUpdateEmailToOld(app, {
                    userData: req.userData!,
                    body: req.body
                })
                await reply.sendData(data)
            }
        }
    )

    app.post<{ Params: schemasRoutes.profile.SendEmailUpdateEmailToNewParams }>(
        constantsRoutes.profile.sendEmailUpdateEmailToNew,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                params: schemasRoutes.profile.sendEmailUpdateEmailToNewParams()
            },
            async handler(req, reply) {
                const data = await handlers.sendEmailUpdateEmailToNew(app, { params: req.params })
                await reply.sendData(data)
            }
        }
    )

    app.post<{ Params: schemasRoutes.profile.UpdateEmailParams }>(
        constantsRoutes.profile.updateEmail,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                params: schemasRoutes.profile.updateEmailParams()
            },
            async handler(req, reply) {
                const data = await handlers.updateEmail(app, { params: req.params })
                await reply.sendData(data)
            }
        }
    )

    app.post<{ Body: schemasRoutes.profile.ChangePasswordBody }>(
        constantsRoutes.profile.changePassword,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                body: schemasRoutes.profile.changePasswordBody()
            },
            preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.changePassword(app, {
                    userData: req.userData!,
                    body: req.body
                })
                await reply.sendData(data)
            }
        }
    )

    app.post<{ Body: schemasRoutes.profile.SendPasswordResetEmailBody }>(
        constantsRoutes.profile.sendPasswordResetEmail,
        {
            schema: {
                tags: [constantsRoutes.profile.base],
                body: schemasRoutes.profile.sendPasswordResetEmailBody()
            },
            async handler(req, reply) {
                const data = await handlers.sendPasswordResetEmail(app, { body: req.body })
                await reply.sendData(data)
            }
        }
    )

    app.post<{
        Params: schemasRoutes.profile.ResetPasswordParams
        Body: schemasRoutes.profile.ResetPasswordBody
    }>(constantsRoutes.profile.resetPassword, {
        schema: {
            tags: [constantsRoutes.profile.base],
            params: schemasRoutes.profile.resetPasswordParams(),
            body: schemasRoutes.profile.resetPasswordBody()
        },
        async handler(req, reply) {
            const data = await handlers.resetPassword(app, {
                params: req.params,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    done()
}
