import { MultipartFile } from "@fastify/multipart"
import { z } from "zod"
import * as schemas from "$/schemas"

export const basePath = "/profile"

export const getUserPath = "/user"

export const updateUserPath = "/user"

export function updateUserBodySchema() {
    return z.object({
        email: schemas.models.user.email().optional(),
        username: schemas.models.user.username().optional()
    })
}

export type UpdateUserBody = z.infer<ReturnType<typeof updateUserBodySchema>>

export const uploadAvatarPath = "/avatar"

export function uploadAvatarBodySchema() {
    return z.object({
        img: schemas.file()
    })
}

export interface UploadAvatarBody {
    img: MultipartFile
}

export const deleteAvatarPath = "/avatar"

export const sendConfirmationEmailPath = "/email/confirm"

export const confirmEmailPath = "/email/confirm/:emailConfirmationToken"

export function confirmEmailParamsSchema() {
    return z.object({
        emailConfirmationToken: schemas.models.emailConfirmationToken.token()
    })
}

export type ConfirmEmailParams = z.infer<ReturnType<typeof confirmEmailParamsSchema>>

export const changePasswordPath = "/password/change"

export function changePasswordBodySchema() {
    return z.object({
        oldPassword: schemas.models.user.password(),
        newPassword: schemas.models.user.password()
    })
}

export type ChangePasswordBody = z.infer<ReturnType<typeof changePasswordBodySchema>>

export const sendPasswordResetEmailPath = "/password/reset"

export function sendPasswordResetEmailBodySchema() {
    return z.object({
        email: schemas.models.user.email()
    })
}

export type SendPasswordResetEmailBody = z.infer<
    ReturnType<typeof sendPasswordResetEmailBodySchema>
>

export const resetPasswordPath = "/password/reset/:passwordResetToken"

export function resetPasswordParamsSchema() {
    return z.object({
        passwordResetToken: schemas.models.passwordResetToken.token()
    })
}

export type ResetPasswordParams = z.infer<ReturnType<typeof resetPasswordParamsSchema>>

export function resetPasswordBodySchema() {
    return z.object({
        newPassword: schemas.models.user.password()
    })
}

export type ResetPasswordBody = z.infer<ReturnType<typeof resetPasswordBodySchema>>
