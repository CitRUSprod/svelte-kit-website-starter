import type { MultipartFile } from "@fastify/multipart"
import * as schemasRoutes from "@repo/schemas/routes"
import argon2 from "argon2"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import { v4 as createUuid } from "uuid"

import { getLogoutCookies } from "../auth/utils"

import * as utils from "./utils"

import { env, enums } from "$/constants"
import type { RouteHandler } from "$/types"
import { isImgFile, sendEmail, models } from "$/utils"

export const getUser = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    return { payload: models.user.dto(req.userData) }
}) satisfies RouteHandler<void, schemasRoutes.profile.GetUserResponse>

export const updateUser = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (req.body.username && req.body.username !== req.userData.username) {
        const userByUsername = await app.prisma.user.findFirst({
            where: { username: { equals: req.body.username, mode: "insensitive" } }
        })

        if (userByUsername) {
            throw new BadRequestError(req.ll.userWithSuchUsernameAlreadyExists())
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

export const deleteUser = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    await utils.deleteUser(app, req.userData)

    return { cookies: getLogoutCookies() }
}) satisfies RouteHandler<void, schemasRoutes.profile.DeleteUserResponse>

export const uploadAvatar = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const img = req.body.img as MultipartFile

    if (!isImgFile(img)) {
        throw new BadRequestError(req.ll.fileIsNotImage())
    }

    const avatar = await app.minio.writeFile(enums.ImgPath.Avatars, img)

    if (req.userData.avatar) {
        await app.minio.removeFile(enums.ImgPath.Avatars, req.userData.avatar)
    }

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
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (!req.userData.avatar) {
        throw new BadRequestError(req.ll.youDoNotHaveAvatar())
    }

    if (req.userData.avatar) {
        await app.minio.removeFile(enums.ImgPath.Avatars, req.userData.avatar)
    }

    await app.prisma.user.update({
        where: { id: req.userData.id },
        data: { avatar: null }
    })

    return {}
}) satisfies RouteHandler<void, schemasRoutes.profile.DeleteAvatarResponse>

export const sendEmailUpdateEmailToOld = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (!req.userData.email) {
        throw new BadRequestError(req.ll.emailIsNotSet())
    }

    if (req.userData.email === req.body.email) {
        throw new BadRequestError(req.ll.oldAndNewEmailsMatch())
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
    const subject = req.ll.emailUpdate()

    await sendEmail(req.userData.email, subject, "basic", {
        greeting: `${req.ll.dear()} ${req.userData.username}!`,
        text: req.ll.emailUpdateText(),
        link: url,
        linkText: req.ll.updateEmailTo({ email: req.body.email })
    })

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

    if (!emailUpdateToken) {
        throw new BadRequestError(req.ll.emailUpdateTokenExpired())
    }

    const user = await app.prisma.user.findFirst({
        where: { id: emailUpdateToken.userId }
    })

    if (!user) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const { tokenTo } = emailUpdateToken

    const url = new URL(`/profile/email/to/${tokenTo}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.emailUpdate()

    await sendEmail(emailUpdateToken.email, subject, "basic", {
        greeting: `${req.ll.dear()} ${user.username}!`,
        text: req.ll.emailUpdateText(),
        link: url,
        linkText: req.ll.updateEmail()
    })

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

    if (!emailUpdateToken) {
        throw new BadRequestError(req.ll.emailUpdateTokenExpired())
    }

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
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (!req.userData.password) {
        throw new BadRequestError(req.ll.passwordIsNotSet())
    }

    if (req.body.oldPassword === req.body.newPassword) {
        throw new BadRequestError(req.ll.oldAndNewPasswordsMatch())
    }

    const isCorrectPassword = await argon2.verify(req.userData.password, req.body.oldPassword)

    if (!isCorrectPassword) {
        throw new BadRequestError(req.ll.incorrectOldPassword())
    }

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

    if (!user) {
        throw new BadRequestError(req.ll.userWithEmailNotFound())
    }

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
    const subject = req.ll.passwordReset()

    await sendEmail(user.email!, subject, "basic", {
        greeting: `${req.ll.dear()} ${user.username}!`,
        text: req.ll.emailResetPasswordText(),
        link: url,
        linkText: req.ll.resetPassword()
    })

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

    if (!passwordResetToken) {
        throw new BadRequestError(req.ll.passwordResetTokenExpired())
    }

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
