import { BadRequestError } from "http-errors-enhanced"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import { ImgPath } from "$/enums"
import { env, isImgFile, writeFile, removeFile, sendEmail, models } from "$/utils"
import { UserData, RouteHandler } from "$/types"
import * as schemas from "./schemas"
import * as utils from "./utils"

export const getUser: RouteHandler<{ userData: UserData }> = async (app, { userData }) => ({
    payload: models.user.dto(userData)
})

export const updateUser: RouteHandler<{
    userData: UserData
    body: schemas.UpdateUserBody
}> = async (app, { userData, body }) => {
    if (body.email && body.email !== userData.email) {
        const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
        if (userByEmail) throw new BadRequestError("User with such email already exists")
    }

    if (body.username && body.username !== userData.username) {
        const userByUsername = await app.prisma.user.findFirst({
            where: { username: body.username }
        })
        if (userByUsername) throw new BadRequestError("User with such username already exists")
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: userData.id },
        data: {
            email: body.email,
            username: body.username,
            confirmedEmail:
                body.email === undefined || body.email === userData.email ? undefined : false
        },
        include: { role: true }
    })

    return { payload: models.user.dto(updatedUser) }
}

export const uploadAvatar: RouteHandler<{
    userData: UserData
    body: schemas.UploadAvatarBody
}> = async (app, { userData, body }) => {
    if (!isImgFile(body.img)) throw new BadRequestError("File is not an image")

    const avatar = await writeFile(ImgPath.Avatars, body.img)

    if (userData.avatar) await removeFile(ImgPath.Avatars, userData.avatar)

    await app.prisma.user.update({
        where: { id: userData.id },
        data: { avatar }
    })

    return {}
}

export const deleteAvatar: RouteHandler<{
    userData: UserData
}> = async (app, { userData }) => {
    if (!userData.avatar) throw new BadRequestError("You do not have an avatar")

    await removeFile(ImgPath.Avatars, userData.avatar)

    await app.prisma.user.update({
        where: { id: userData.id },
        data: { avatar: null }
    })

    return {}
}

export const sendConfirmationEmail: RouteHandler<{ userData: UserData }> = async (
    app,
    { userData }
) => {
    if (userData.confirmedEmail) throw new BadRequestError("Email is already confirmed")

    const token = createUuid()

    const emailConfirmationToken = await app.prisma.emailConfirmationToken.findFirst({
        where: { userId: userData.id }
    })

    if (emailConfirmationToken) {
        await app.prisma.emailConfirmationToken.update({
            where: { id: emailConfirmationToken.id },
            data: { token, creationDate: new Date() }
        })
    } else {
        await app.prisma.emailConfirmationToken.create({
            data: { token, userId: userData.id, creationDate: new Date() }
        })
    }

    const url = env.EMAIL_CONFIRMATION_URL.replace(/{token}/g, token)
    const subject = "Email confirmation"
    const message = `
        <div>
            <h3>Dear ${userData.username}</h3>
        </div>
        <div>
            <a href="${url}">Confirm Email</a>
        </div>
    `
    await sendEmail(userData.email, subject, message)

    return {}
}

export const confirmEmail: RouteHandler<{ params: schemas.ConfirmEmailParams }> = async (
    app,
    { params }
) => {
    await utils.deleteExpiredEmailConfirmationTokens(app)

    const emailConfirmationToken = await app.prisma.emailConfirmationToken.findFirst({
        where: { token: params.emailConfirmationToken }
    })
    if (!emailConfirmationToken) throw new BadRequestError("Email confirmation token expired")

    await app.prisma.user.update({
        where: { id: emailConfirmationToken.userId },
        data: { confirmedEmail: true }
    })

    await app.prisma.emailConfirmationToken.delete({ where: { id: emailConfirmationToken.id } })

    return {}
}

export const changePassword: RouteHandler<{
    userData: UserData
    body: schemas.ChangePasswordBody
}> = async (app, { userData, body }) => {
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
}

export const sendPasswordResetEmail: RouteHandler<{
    body: schemas.SendPasswordResetEmailBody
}> = async (app, { body }) => {
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

    const url = env.PASSWORD_RESET_URL.replace(/{token}/g, token)
    const subject = "Password reset"
    const message = `
        <div>
            <h3>Dear ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">Reset password</a>
        </div>
    `
    await sendEmail(user.email, subject, message)

    return {}
}

export const resetPassword: RouteHandler<{
    params: schemas.ResetPasswordParams
    body: schemas.ResetPasswordBody
}> = async (app, { params, body }) => {
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
}
