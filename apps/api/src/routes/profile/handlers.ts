import { MultipartFile } from "@fastify/multipart"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import * as schemasRoutes from "@local/schemas/routes"
import { env, enums } from "$/constants"
import { isImgFile, writeFile, removeFile, sendEmail, models } from "$/utils"
import { RouteHandler } from "$/types"
import * as utils from "./utils"

export const getUser = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())

    return { payload: models.user.dto(req.userData) }
}) satisfies RouteHandler<void, schemasRoutes.profile.GetUserResponse>

export const updateUser = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())

    if (req.body.username && req.body.username !== req.userData.username) {
        const userByUsername = await app.prisma.user.findFirst({
            where: { username: { contains: req.body.username, mode: "insensitive" } }
        })

        if (userByUsername) {
            throw new BadRequestError(req.ll.$profile.userWithSuchUsernameAlreadyExists())
        }
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: req.userData.id },
        data: {
            username: req.body.username
        },
        include: { role: true, ban: { include: { author: true } } }
    })

    return { payload: models.user.dto(updatedUser) }
}) satisfies RouteHandler<
    { Body: schemasRoutes.profile.UpdateUserBody },
    schemasRoutes.profile.UpdateUserResponse
>

export const uploadAvatar = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())

    const img = req.body.img as MultipartFile

    if (!isImgFile(img)) throw new BadRequestError(req.ll.$profile.fileIsNotImage())

    const avatar = await writeFile(enums.ImgPath.Avatars, img)

    if (req.userData.avatar) await removeFile(enums.ImgPath.Avatars, req.userData.avatar)

    await app.prisma.user.update({
        where: { id: req.userData.id },
        data: { avatar }
    })

    return {}
}) satisfies RouteHandler<
    { Body: schemasRoutes.profile.UploadAvatarBody },
    schemasRoutes.profile.UploadAvatarResponse
>

export const deleteAvatar = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())
    if (!req.userData.avatar) throw new BadRequestError(req.ll.$profile.youDoNotHaveAvatar())

    await removeFile(enums.ImgPath.Avatars, req.userData.avatar)

    await app.prisma.user.update({
        where: { id: req.userData.id },
        data: { avatar: null }
    })

    return {}
}) satisfies RouteHandler<void, schemasRoutes.profile.DeleteAvatarResponse>

export const sendEmailUpdateEmailToOld = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())
    if (!req.userData.email) throw new BadRequestError(req.ll.$profile.emailIsNotSet())

    if (req.userData.email === req.body.email) {
        throw new BadRequestError(req.ll.$profile.oldAndNewEmailsMatch())
    }

    await utils.deleteExpiredEmailUpdateTokens(app)

    const tokenFrom = createUuid()
    const tokenTo = createUuid()

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { userId: req.userData.id }
    })

    if (emailUpdateToken) {
        await app.prisma.emailUpdateToken.update({
            where: { id: emailUpdateToken.id },
            data: { tokenFrom, tokenTo, email: req.body.email, creationDate: new Date() }
        })
    } else {
        await app.prisma.emailUpdateToken.create({
            data: {
                tokenFrom,
                tokenTo,
                email: req.body.email,
                userId: req.userData.id,
                creationDate: new Date()
            }
        })
    }

    const url = new URL(`/profile/email/from/${tokenFrom}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.$profile.emailUpdate()
    const message = `
        <div>
            <h3>${req.ll.$profile.dear()} ${req.userData.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.$profile.updateEmailTo({ email: req.body.email })}</a>
        </div>
    `
    await sendEmail(req.userData.email, subject, message)

    return {}
}) satisfies RouteHandler<
    { Body: schemasRoutes.profile.SendEmailUpdateEmailToOldBody },
    schemasRoutes.profile.SendEmailUpdateEmailToOldResponse
>

export const sendEmailUpdateEmailToNew = (async (app, req) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { tokenFrom: req.params.emailUpdateToken }
    })

    if (!emailUpdateToken) throw new BadRequestError(req.ll.$profile.emailUpdateTokenExpired())

    const user = await app.prisma.user.findFirst({
        where: { id: emailUpdateToken.userId }
    })

    if (!user) throw new InternalServerError(req.ll.$profile.unexpectedError())

    const { tokenTo } = emailUpdateToken

    const url = new URL(`/profile/email/to/${tokenTo}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.$profile.emailUpdate()
    const message = `
        <div>
            <h3>Dear ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.$profile.updateEmail()}</b></a>
        </div>
    `
    await sendEmail(emailUpdateToken.email, subject, message)

    return {}
}) satisfies RouteHandler<
    { Params: schemasRoutes.profile.SendEmailUpdateEmailToNewParams },
    schemasRoutes.profile.SendEmailUpdateEmailToNewResponse
>

export const updateEmail = (async (app, req) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { tokenTo: req.params.emailUpdateToken }
    })
    if (!emailUpdateToken) throw new BadRequestError(req.ll.$profile.emailUpdateTokenExpired())

    await app.prisma.user.update({
        where: { id: emailUpdateToken.userId },
        data: {
            email: emailUpdateToken.email
        }
    })

    await app.prisma.emailUpdateToken.delete({ where: { id: emailUpdateToken.id } })

    return {}
}) satisfies RouteHandler<
    { Params: schemasRoutes.profile.UpdateEmailParams },
    schemasRoutes.profile.UpdateEmailResponse
>

export const changePassword = (async (app, req) => {
    if (!req.userData) throw new InternalServerError(req.ll.$profile.unexpectedError())
    if (!req.userData.password) throw new BadRequestError(req.ll.$profile.passwordIsNotSet())

    if (req.body.oldPassword === req.body.newPassword) {
        throw new BadRequestError(req.ll.$profile.oldAndNewPasswordsMatch())
    }

    const isCorrectPassword = await argon2.verify(req.userData.password, req.body.oldPassword)
    if (!isCorrectPassword) throw new BadRequestError(req.ll.$profile.incorrectOldPassword())

    const newPassword = await argon2.hash(req.body.newPassword)
    await app.prisma.user.update({
        where: { id: req.userData.id },
        data: { password: newPassword }
    })

    return {}
}) satisfies RouteHandler<
    { Body: schemasRoutes.profile.ChangePasswordBody },
    schemasRoutes.profile.ChangePasswordResponse
>

export const sendPasswordResetEmail = (async (app, req) => {
    const user = await app.prisma.user.findFirst({ where: { email: req.body.email } })
    if (!user) throw new BadRequestError(req.ll.$profile.userWithEmailNotFound())

    const token = createUuid()

    const passwordResetToken = await app.prisma.passwordResetToken.findFirst({
        where: { userId: user.id }
    })

    if (passwordResetToken) {
        await app.prisma.passwordResetToken.update({
            where: { id: passwordResetToken.id },
            data: { token, creationDate: new Date() }
        })
    } else {
        await app.prisma.passwordResetToken.create({
            data: { token, userId: user.id, creationDate: new Date() }
        })
    }

    const url = new URL(`/profile/password/${token}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.$profile.passwordReset()
    const message = `
        <div>
            <h3>${req.ll.$profile.dear()} ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.$profile.resetPassword()}</a>
        </div>
    `
    await sendEmail(user.email!, subject, message)

    return {}
}) satisfies RouteHandler<
    { Body: schemasRoutes.profile.SendPasswordResetEmailBody },
    schemasRoutes.profile.SendPasswordResetEmailResponse
>

export const resetPassword = (async (app, req) => {
    await utils.deleteExpiredPasswordResetTokens(app)

    const passwordResetToken = await app.prisma.passwordResetToken.findFirst({
        where: { token: req.params.passwordResetToken }
    })
    if (!passwordResetToken) throw new BadRequestError(req.ll.$profile.passwordResetTokenExpired())

    const newPassword = await argon2.hash(req.body.newPassword)
    await app.prisma.user.update({
        where: { id: passwordResetToken.userId },
        data: { password: newPassword }
    })

    await app.prisma.passwordResetToken.delete({ where: { id: passwordResetToken.id } })

    return {}
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.profile.ResetPasswordParams
        Body: schemasRoutes.profile.ResetPasswordBody
    },
    schemasRoutes.profile.ResetPasswordResponse
>
