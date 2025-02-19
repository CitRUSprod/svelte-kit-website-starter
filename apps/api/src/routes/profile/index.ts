import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"
import type { FastifyPluginCallback } from "fastify"

import * as handlers from "./handlers"

export const profileRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(constantsRoutes.profile.getUser, {
        schema: {
            tags: [constantsRoutes.profile.base]
        },
        preHandler: app.createPreHandler([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.getUser(app, req)
            await reply.sendData(data)
        }
    })

    app.patch<{ Body: schemasRoutes.profile.UpdateUserBody }>(constantsRoutes.profile.updateUser, {
        schema: {
            tags: [constantsRoutes.profile.base],
            body: schemasRoutes.profile.updateUserBody()
        },
        preHandler: app.createPreHandler([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.updateUser(app, req)
            await reply.sendData(data)
        }
    })

    app.delete(constantsRoutes.profile.deleteUser, {
        schema: {
            tags: [constantsRoutes.profile.base]
        },
        preHandler: app.createPreHandler([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.deleteUser(app, req)
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
            preHandler: app.createPreHandler([app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.uploadAvatar(app, req)
                await reply.sendData(data)
            }
        }
    )

    app.delete(constantsRoutes.profile.deleteAvatar, {
        schema: {
            tags: [constantsRoutes.profile.base]
        },
        preHandler: app.createPreHandler([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.deleteAvatar(app, req)
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
            preHandler: app.createPreHandler([app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.sendEmailUpdateEmailToOld(app, req)
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
                const data = await handlers.sendEmailUpdateEmailToNew(app, req)
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
                const data = await handlers.updateEmail(app, req)
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
            preHandler: app.createPreHandler([app.verifyAuth]),
            async handler(req, reply) {
                const data = await handlers.changePassword(app, req)
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
                const data = await handlers.sendPasswordResetEmail(app, req)
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
            const data = await handlers.resetPassword(app, req)
            await reply.sendData(data)
        }
    })

    done()
}
