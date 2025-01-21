import { z } from "zod"

import * as common from "$/common"
import * as models from "$/models"

// GetUser

export function getUserRequest() {
    return z.void()
}

export type GetUserRequest = z.infer<ReturnType<typeof getUserRequest>>

export function getUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type GetUserResponse = z.infer<ReturnType<typeof getUserResponse>>

// UpdateUser

export function updateUserBody() {
    return z.object({
        username: models.user.username().optional()
    })
}

export type UpdateUserBody = z.infer<ReturnType<typeof updateUserBody>>

export function updateUserRequest() {
    return z.object({
        ...updateUserBody().shape
    })
}

export type UpdateUserRequest = z.infer<ReturnType<typeof updateUserRequest>>

export function updateUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type UpdateUserResponse = z.infer<ReturnType<typeof updateUserResponse>>

// DeleteUser

export function deleteUserRequest() {
    return z.void()
}

export type DeleteUserRequest = z.infer<ReturnType<typeof deleteUserRequest>>

export function deleteUserResponse() {
    return z.void()
}

export type DeleteUserResponse = z.infer<ReturnType<typeof deleteUserResponse>>

// UploadAvatar

export function uploadAvatarBody() {
    return z.object({
        img: common.file()
    })
}

export type UploadAvatarBody = z.infer<ReturnType<typeof uploadAvatarBody>>

export function uploadAvatarRequest() {
    return z.object({
        ...uploadAvatarBody().shape
    })
}

export type UploadAvatarRequest = z.infer<ReturnType<typeof uploadAvatarRequest>>

export function uploadAvatarResponse() {
    return z.void()
}

export type UploadAvatarResponse = z.infer<ReturnType<typeof uploadAvatarResponse>>

// DeleteAvatar

export function deleteAvatarRequest() {
    return z.void()
}

export type DeleteAvatarRequest = z.infer<ReturnType<typeof deleteAvatarRequest>>

export function deleteAvatarResponse() {
    return z.void()
}

export type DeleteAvatarResponse = z.infer<ReturnType<typeof deleteAvatarResponse>>

// SendEmailUpdateEmailToOld

export function sendEmailUpdateEmailToOldBody() {
    return z.object({
        email: models.user.email()
    })
}

export type SendEmailUpdateEmailToOldBody = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToOldBody>
>

export function sendEmailUpdateEmailToOldRequest() {
    return z.object({
        ...sendEmailUpdateEmailToOldBody().shape
    })
}

export type SendEmailUpdateEmailToOldRequest = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToOldRequest>
>

export function sendEmailUpdateEmailToOldResponse() {
    return z.void()
}

export type SendEmailUpdateEmailToOldResponse = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToOldResponse>
>

// SendEmailUpdateEmailToNew

export function sendEmailUpdateEmailToNewParams() {
    return z.object({
        emailUpdateToken: common.token()
    })
}

export type SendEmailUpdateEmailToNewParams = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToNewParams>
>

export function sendEmailUpdateEmailToNewRequest() {
    return z.object({
        ...sendEmailUpdateEmailToNewParams().shape
    })
}

export type SendEmailUpdateEmailToNewRequest = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToNewRequest>
>

export function sendEmailUpdateEmailToNewResponse() {
    return z.void()
}

export type SendEmailUpdateEmailToNewResponse = z.infer<
    ReturnType<typeof sendEmailUpdateEmailToNewResponse>
>

// UpdateEmail

export function updateEmailParams() {
    return z.object({
        emailUpdateToken: common.token()
    })
}

export type UpdateEmailParams = z.infer<ReturnType<typeof updateEmailParams>>

export function updateEmailRequest() {
    return z.object({
        ...updateEmailParams().shape
    })
}

export type UpdateEmailRequest = z.infer<ReturnType<typeof updateEmailRequest>>

export function updateEmailResponse() {
    return z.void()
}

export type UpdateEmailResponse = z.infer<ReturnType<typeof updateEmailResponse>>

// ChangePassword

export function changePasswordBody() {
    return z.object({
        oldPassword: models.user.password(),
        newPassword: models.user.password()
    })
}

export type ChangePasswordBody = z.infer<ReturnType<typeof changePasswordBody>>

export function changePasswordRequest() {
    return z.object({
        ...changePasswordBody().shape
    })
}

export type ChangePasswordRequest = z.infer<ReturnType<typeof changePasswordRequest>>

export function changePasswordResponse() {
    return z.void()
}

export type ChangePasswordResponse = z.infer<ReturnType<typeof changePasswordResponse>>

// SendPasswordResetEmail

export function sendPasswordResetEmailBody() {
    return z.object({
        email: models.user.email()
    })
}

export type SendPasswordResetEmailBody = z.infer<ReturnType<typeof sendPasswordResetEmailBody>>

export function sendPasswordResetEmailRequest() {
    return z.object({
        ...sendPasswordResetEmailBody().shape
    })
}

export type SendPasswordResetEmailRequest = z.infer<
    ReturnType<typeof sendPasswordResetEmailRequest>
>

export function sendPasswordResetEmailResponse() {
    return z.void()
}

export type SendPasswordResetEmailResponse = z.infer<
    ReturnType<typeof sendPasswordResetEmailResponse>
>

// ResetPassword

export function resetPasswordParams() {
    return z.object({
        passwordResetToken: common.token()
    })
}

export type ResetPasswordParams = z.infer<ReturnType<typeof resetPasswordParams>>

export function resetPasswordBody() {
    return z.object({
        newPassword: models.user.password()
    })
}

export type ResetPasswordBody = z.infer<ReturnType<typeof resetPasswordBody>>

export function resetPasswordRequest() {
    return z.object({
        ...resetPasswordParams().shape,
        ...resetPasswordBody().shape
    })
}

export type ResetPasswordRequest = z.infer<ReturnType<typeof resetPasswordRequest>>

export function resetPasswordResponse() {
    return z.void()
}

export type ResetPasswordResponse = z.infer<ReturnType<typeof resetPasswordResponse>>
