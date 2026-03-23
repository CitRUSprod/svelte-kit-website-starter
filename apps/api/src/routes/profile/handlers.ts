import * as schemasRoutes from "@repo/schemas/routes"
import argon2 from "argon2"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import { v4 as createUuid } from "uuid"

import { getLogoutCookies } from "../auth/utils"

import * as utils from "./utils"

import { env, enums } from "$/constants"
import { Prisma } from "$/prisma/generated/client"
import { defineRouteHandler, sendEmail, models } from "$/utils"

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const getUser = defineRouteHandler<void, schemasRoutes.profile.$GetUserResponse>(
    async (app, req) => {
        if (!req.userData) {
            throw new InternalServerError(req.ll.unexpectedError())
        }

        return {
            payload: models.user.dto(req.userData)
        }
    }
)

export const updateUser = defineRouteHandler<
    { Body: schemasRoutes.profile.$UpdateUserBody },
    schemasRoutes.profile.$UpdateUserResponse
>(async (app, req) => {
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

    const data: Prisma.UserUpdateInput = {}

    if (req.body.username) {
        data.username = req.body.username
    }

    if (req.body.imgTempId !== undefined) {
        if (req.body.imgTempId === null) {
            data.avatar = null
        } else {
            const temporaryImage = await models.temporaryImage.get(app, req, req.body.imgTempId)

            data.avatar = temporaryImage.image

            await app.prisma.temporaryImage.delete({
                where: { id: req.body.imgTempId }
            })

            await app.minio.moveFile(
                enums.TemporaryStoragePath.Image,
                temporaryImage.image,
                enums.ImgPath.Avatars
            )
        }
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: req.userData.id },
        data,
        include: models.user.include
    })

    return {
        payload: models.user.dto(updatedUser)
    }
})

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const deleteUser = defineRouteHandler<void, schemasRoutes.profile.$DeleteUserResponse>(
    async (app, req) => {
        if (!req.userData) {
            throw new InternalServerError(req.ll.unexpectedError())
        }

        if (req.userData.id === 1) {
            throw new BadRequestError(req.ll.cannotDeleteSystemUser())
        }

        await utils.deleteUser(app, req.userData)

        return {
            cookies: getLogoutCookies()
        }
    }
)

export const sendEmailUpdateEmailToOld = defineRouteHandler<
    { Body: schemasRoutes.profile.$SendEmailUpdateEmailToOldBody },
    schemasRoutes.profile.$SendEmailUpdateEmailToOldResponse
>(async (app, req) => {
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

    const emailUpdateToken = await app.prisma.emailUpdateToken.findUnique({
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
})

export const sendEmailUpdateEmailToNew = defineRouteHandler<
    { Params: schemasRoutes.profile.$SendEmailUpdateEmailToNewParams },
    schemasRoutes.profile.$SendEmailUpdateEmailToNewResponse
>(async (app, req) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findUnique({
        where: { tokenFrom: req.params.emailUpdateToken }
    })

    if (!emailUpdateToken) {
        throw new BadRequestError(req.ll.emailUpdateTokenExpired())
    }

    const user = await app.prisma.user.findUnique({
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
})

export const updateEmail = defineRouteHandler<
    { Params: schemasRoutes.profile.$UpdateEmailParams },
    schemasRoutes.profile.$UpdateEmailResponse
>(async (app, req) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findUnique({
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
})

export const changePassword = defineRouteHandler<
    { Body: schemasRoutes.profile.$ChangePasswordBody },
    schemasRoutes.profile.$ChangePasswordResponse
>(async (app, req) => {
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
})

export const sendPasswordResetEmail = defineRouteHandler<
    { Body: schemasRoutes.profile.$SendPasswordResetEmailBody },
    schemasRoutes.profile.$SendPasswordResetEmailResponse
>(async (app, req) => {
    const user = await app.prisma.user.findUnique({ where: { email: req.body.email } })

    if (!user) {
        throw new BadRequestError(req.ll.userWithEmailNotFound())
    }

    const token = createUuid()

    const passwordResetToken = await app.prisma.passwordResetToken.findUnique({
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
})

export const resetPassword = defineRouteHandler<
    {
        Params: schemasRoutes.profile.$ResetPasswordParams
        Body: schemasRoutes.profile.$ResetPasswordBody
    },
    schemasRoutes.profile.$ResetPasswordResponse
>(async (app, req) => {
    await utils.deleteExpiredPasswordResetTokens(app)

    const passwordResetToken = await app.prisma.passwordResetToken.findUnique({
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
})
