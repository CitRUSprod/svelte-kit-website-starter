import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const profileRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get("/user", {
        schema: {
            tags: ["profile"]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.getUser(app, { userData: req.userData! })
            await reply.sendData(data)
        }
    })

    app.patch<{ Body: schemas.UpdateUserBody }>("/user", {
        schema: {
            tags: ["profile"],
            body: schemas.updateUserBody
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.updateUser(app, { userData: req.userData!, body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.UploadAvatarBody }>("/avatar", {
        schema: {
            tags: ["profile"],
            body: schemas.uploadAvatarBody
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

    app.delete("/avatar", {
        schema: {
            tags: ["profile"]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.deleteAvatar(app, {
                userData: req.userData!
            })
            await reply.sendData(data)
        }
    })

    app.post("/email/confirm", {
        schema: {
            tags: ["profile"]
        },
        preHandler: app.createPreHandler([app.setUserData, app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.sendConfirmationEmail(app, { userData: req.userData! })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.ConfirmEmailParams }>("/email/confirm/:emailConfirmationToken", {
        schema: {
            tags: ["profile"],
            params: schemas.confirmEmailParams
        },
        async handler(req, reply) {
            const data = await handlers.confirmEmail(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.ChangePasswordBody }>("/password/change", {
        schema: {
            tags: ["profile"],
            body: schemas.changePasswordBody
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

    app.post<{ Body: schemas.SendPasswordResetEmailBody }>("/password/reset", {
        schema: {
            tags: ["profile"],
            body: schemas.sendPasswordResetEmailBody
        },
        async handler(req, reply) {
            const data = await handlers.sendPasswordResetEmail(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.ResetPasswordParams; Body: schemas.ResetPasswordBody }>(
        "/password/reset/:passwordResetToken",
        {
            schema: {
                tags: ["profile"],
                params: schemas.resetPasswordParams,
                body: schemas.resetPasswordBody
            },
            async handler(req, reply) {
                const data = await handlers.resetPassword(app, {
                    params: req.params,
                    body: req.body
                })
                await reply.sendData(data)
            }
        }
    )

    done()
}
