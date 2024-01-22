import { z } from "zod"
import * as common from "$/common"
import * as models from "$/models"

export function updateUserBody() {
    return z.object({
        email: models.user.email().optional(),
        username: models.user.username().optional()
    })
}

export type UpdateUserBody = z.infer<ReturnType<typeof updateUserBody>>

export function uploadAvatarBody() {
    return z.object({
        img: common.file()
    })
}

export type UploadAvatarBody = z.infer<ReturnType<typeof uploadAvatarBody>>

export function confirmEmailParams() {
    return z.object({
        emailConfirmationToken: models.emailConfirmationToken.token()
    })
}

export type ConfirmEmailParams = z.infer<ReturnType<typeof confirmEmailParams>>

export function changePasswordBody() {
    return z.object({
        oldPassword: models.user.password(),
        newPassword: models.user.password()
    })
}

export type ChangePasswordBody = z.infer<ReturnType<typeof changePasswordBody>>

export function sendPasswordResetEmailBody() {
    return z.object({
        email: models.user.email()
    })
}

export type SendPasswordResetEmailBody = z.infer<ReturnType<typeof sendPasswordResetEmailBody>>

export function resetPasswordParams() {
    return z.object({
        passwordResetToken: models.passwordResetToken.token()
    })
}

export type ResetPasswordParams = z.infer<ReturnType<typeof resetPasswordParams>>

export function resetPasswordBody() {
    return z.object({
        newPassword: models.user.password()
    })
}

export type ResetPasswordBody = z.infer<ReturnType<typeof resetPasswordBody>>
