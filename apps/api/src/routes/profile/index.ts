import { FastifyPluginCallback } from "fastify"
import * as common from "$/common"
import * as handlers from "./handlers"

export const profileRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get(common.profile.getUserPath, {
        schema: {
            tags: [common.profile.basePath]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.getUser(app, { userData: req.userData! })
            await reply.sendData(data)
        }
    })

    app.patch<{ Body: common.profile.UpdateUserBody }>(common.profile.updateUserPath, {
        schema: {
            tags: [common.profile.basePath],
            body: common.profile.updateUserBodySchema()
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.updateUser(app, { userData: req.userData!, body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.profile.UploadAvatarBody }>(common.profile.uploadAvatarPath, {
        schema: {
            tags: [common.profile.basePath],
            body: common.profile.uploadAvatarBodySchema()
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.uploadAvatar(app, {
                userData: req.userData!,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    app.delete(common.profile.deleteAvatarPath, {
        schema: {
            tags: [common.profile.basePath]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.deleteAvatar(app, {
                userData: req.userData!
            })
            await reply.sendData(data)
        }
    })

    app.post(common.profile.sendConfirmationEmailPath, {
        schema: {
            tags: [common.profile.basePath]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.sendConfirmationEmail(app, { userData: req.userData! })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: common.profile.ConfirmEmailParams }>(common.profile.confirmEmailPath, {
        schema: {
            tags: [common.profile.basePath],
            params: common.profile.confirmEmailParamsSchema()
        },
        async handler(req, reply) {
            const data = await handlers.confirmEmail(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.profile.ChangePasswordBody }>(common.profile.changePasswordPath, {
        schema: {
            tags: [common.profile.basePath],
            body: common.profile.changePasswordBodySchema()
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.changePassword(app, {
                userData: req.userData!,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: common.profile.SendPasswordResetEmailBody }>(
        common.profile.sendPasswordResetEmailPath,
        {
            schema: {
                tags: [common.profile.basePath],
                body: common.profile.sendPasswordResetEmailBodySchema()
            },
            async handler(req, reply) {
                const data = await handlers.sendPasswordResetEmail(app, { body: req.body })
                await reply.sendData(data)
            }
        }
    )

    app.post<{
        Params: common.profile.ResetPasswordParams
        Body: common.profile.ResetPasswordBody
    }>(common.profile.resetPasswordPath, {
        schema: {
            tags: [common.profile.basePath],
            params: common.profile.resetPasswordParamsSchema(),
            body: common.profile.resetPasswordBodySchema()
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
