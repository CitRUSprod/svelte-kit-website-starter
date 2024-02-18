import { MultipartFile } from "@fastify/multipart"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import * as schemasRoutes from "@local/schemas/routes"
import { env, enums } from "$/constants"
import { isImgFile, writeFile, removeFile, sendEmail, models } from "$/utils"
import { UserData, RouteHandler } from "$/types"
import * as utils from "./utils"

export const getUser = (async (app, { userData }) => ({
    payload: models.user.dto(userData)
})) satisfies RouteHandler<schemasRoutes.profile.GetUserResponse, { userData: UserData }>

export const updateUser = (async (app, { userData, body }) => {
    if (body.username && body.username !== userData.username) {
        const userByUsername = await app.prisma.user.findFirst({
            where: { username: { contains: body.username, mode: "insensitive" } }
        })
        if (userByUsername) throw new BadRequestError("User with such username already exists")
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: userData.id },
        data: {
            username: body.username
        },
        include: { role: true }
    })

    return { payload: models.user.dto(updatedUser) }
}) satisfies RouteHandler<
    schemasRoutes.profile.UpdateUserResponse,
    { userData: UserData; body: schemasRoutes.profile.UpdateUserBody }
>

export const uploadAvatar = (async (app, { userData, body }) => {
    const img = body.img as MultipartFile

    if (!isImgFile(img)) throw new BadRequestError("File is not an image")

    const avatar = await writeFile(enums.ImgPath.Avatars, img)

    if (userData.avatar) await removeFile(enums.ImgPath.Avatars, userData.avatar)

    await app.prisma.user.update({
        where: { id: userData.id },
        data: { avatar }
    })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.UploadAvatarResponse,
    { userData: UserData; body: schemasRoutes.profile.UploadAvatarBody }
>

export const deleteAvatar = (async (app, { userData }) => {
    if (!userData.avatar) throw new BadRequestError("You do not have an avatar")

    await removeFile(enums.ImgPath.Avatars, userData.avatar)

    await app.prisma.user.update({
        where: { id: userData.id },
        data: { avatar: null }
    })

    return {}
}) satisfies RouteHandler<schemasRoutes.profile.DeleteAvatarResponse, { userData: UserData }>

export const sendEmailUpdateEmailToOld = (async (app, { userData, body }) => {
    if (!userData.email) throw new BadRequestError("Email is not set")
    if (userData.email === body.email) throw new BadRequestError("Old and new emails match")

    await utils.deleteExpiredEmailUpdateTokens(app)

    const tokenFrom = createUuid()
    const tokenTo = createUuid()

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { userId: userData.id }
    })

    if (emailUpdateToken) {
        await app.prisma.emailUpdateToken.update({
            where: { id: emailUpdateToken.id },
            data: { tokenFrom, tokenTo, email: body.email, creationDate: new Date() }
        })
    } else {
        await app.prisma.emailUpdateToken.create({
            data: {
                tokenFrom,
                tokenTo,
                email: body.email,
                userId: userData.id,
                creationDate: new Date()
            }
        })
    }

    const url = new URL(`/profile/email/from/${tokenFrom}`, env.PUBLIC_BASE_URL).toString()
    const subject = "Email update"
    const message = `
        <div>
            <h3>Dear ${userData.username}</h3>
        </div>
        <div>
            <a href="${url}">Update email to <b>${body.email}</b></a>
        </div>
    `
    await sendEmail(userData.email, subject, message)

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.SendEmailUpdateEmailToOldResponse,
    { userData: UserData; body: schemasRoutes.profile.SendEmailUpdateEmailToOldBody }
>

export const sendEmailUpdateEmailToNew = (async (app, { params }) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { tokenFrom: params.emailUpdateToken }
    })

    if (!emailUpdateToken) throw new BadRequestError("Email update token expired")

    const user = await app.prisma.user.findFirst({
        where: { id: emailUpdateToken.userId }
    })

    if (!user) throw new InternalServerError("Unexpected error")

    const { tokenTo } = emailUpdateToken

    const url = new URL(`/profile/email/to/${tokenTo}`, env.PUBLIC_BASE_URL).toString()
    const subject = "Email update"
    const message = `
        <div>
            <h3>Dear ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">Update email</b></a>
        </div>
    `
    await sendEmail(emailUpdateToken.email, subject, message)

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.SendEmailUpdateEmailToNewResponse,
    { params: schemasRoutes.profile.SendEmailUpdateEmailToNewParams }
>

export const updateEmail = (async (app, { params }) => {
    await utils.deleteExpiredEmailUpdateTokens(app)

    const emailUpdateToken = await app.prisma.emailUpdateToken.findFirst({
        where: { tokenTo: params.emailUpdateToken }
    })
    if (!emailUpdateToken) throw new BadRequestError("Email update token expired")

    await app.prisma.user.update({
        where: { id: emailUpdateToken.userId },
        data: {
            email: emailUpdateToken.email
        }
    })

    await app.prisma.emailUpdateToken.delete({ where: { id: emailUpdateToken.id } })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.UpdateEmailResponse,
    { params: schemasRoutes.profile.UpdateEmailParams }
>

export const changePassword = (async (app, { userData, body }) => {
    if (!userData.password) throw new BadRequestError("Password is not set")

    if (body.oldPassword === body.newPassword) {
        throw new BadRequestError("Old and new passwords match")
    }

    const isCorrectPassword = await argon2.verify(userData.password, body.oldPassword)
    if (!isCorrectPassword) throw new BadRequestError("Incorrect old password")

    const newPassword = await argon2.hash(body.newPassword)
    await app.prisma.user.update({
        where: { id: userData.id },
        data: { password: newPassword }
    })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.ChangePasswordResponse,
    { userData: UserData; body: schemasRoutes.profile.ChangePasswordBody }
>

export const sendPasswordResetEmail = (async (app, { body }) => {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequestError("User with such email was not found")

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
    const subject = "Password reset"
    const message = `
        <div>
            <h3>Dear ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">Reset password</a>
        </div>
    `
    await sendEmail(user.email!, subject, message)

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.SendPasswordResetEmailResponse,
    { body: schemasRoutes.profile.SendPasswordResetEmailBody }
>

export const resetPassword = (async (app, { params, body }) => {
    await utils.deleteExpiredPasswordResetTokens(app)

    const passwordResetToken = await app.prisma.passwordResetToken.findFirst({
        where: { token: params.passwordResetToken }
    })
    if (!passwordResetToken) throw new BadRequestError("Password reset token expired")

    const newPassword = await argon2.hash(body.newPassword)
    await app.prisma.user.update({
        where: { id: passwordResetToken.userId },
        data: { password: newPassword }
    })

    await app.prisma.passwordResetToken.delete({ where: { id: passwordResetToken.id } })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.profile.ResetPasswordResponse,
    {
        params: schemasRoutes.profile.ResetPasswordParams
        body: schemasRoutes.profile.ResetPasswordBody
    }
>
