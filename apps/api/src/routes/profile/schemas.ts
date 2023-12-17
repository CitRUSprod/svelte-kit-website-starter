import { MultipartFile } from "@fastify/multipart"
import { z } from "zod"
import * as schemas from "$/schemas"

export const updateUserBody = z.object({
    email: schemas.models.user.email().optional(),
    username: schemas.models.user.username().optional()
})

export type UpdateUserBody = z.infer<typeof updateUserBody>

export const uploadAvatarBody = z.object({
    img: schemas.file()
})

export interface UploadAvatarBody {
    img: MultipartFile
}

export const confirmEmailParams = z.object({
    emailConfirmationToken: schemas.models.emailConfirmationToken.token()
})

export type ConfirmEmailParams = z.infer<typeof confirmEmailParams>

export const changePasswordBody = z.object({
    oldPassword: schemas.models.user.password(),
    newPassword: schemas.models.user.password()
})

export type ChangePasswordBody = z.infer<typeof changePasswordBody>

export const sendPasswordResetEmailBody = z.object({
    email: schemas.models.user.email()
})

export type SendPasswordResetEmailBody = z.infer<typeof sendPasswordResetEmailBody>

export const resetPasswordParams = z.object({
    passwordResetToken: schemas.models.passwordResetToken.token()
})

export type ResetPasswordParams = z.infer<typeof resetPasswordParams>

export const resetPasswordBody = z.object({
    newPassword: schemas.models.user.password()
})

export type ResetPasswordBody = z.infer<typeof resetPasswordBody>
