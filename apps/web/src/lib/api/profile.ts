import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { RequestData } from "$lib/types"

export function getUser(data: RequestData<schemasRoutes.profile.GetUserRequest> = {}) {
    return axios.get<schemasRoutes.profile.GetUserResponse>(
        createApiUrl(constantsRoutes.profile.getUser),
        createAxiosConfig(data.headers)
    )
}

export function updateUser(data: RequestData<schemasRoutes.profile.UpdateUserRequest>) {
    return axios.patch<schemasRoutes.profile.UpdateUserResponse>(
        createApiUrl(constantsRoutes.profile.updateUser),
        {
            email: data.email,
            username: data.username
        },
        createAxiosConfig(data.headers)
    )
}

export function uploadAvatar(data: RequestData<schemasRoutes.profile.UploadAvatarRequest>) {
    const fd = new FormData()
    fd.append("img", data.img)
    return axios.post<schemasRoutes.profile.UploadAvatarResponse>(
        createApiUrl(constantsRoutes.profile.uploadAvatar),
        fd,
        createAxiosConfig(data.headers)
    )
}

export function deleteAvatar(data: RequestData<schemasRoutes.profile.DeleteAvatarRequest> = {}) {
    return axios.delete<schemasRoutes.profile.DeleteAvatarResponse>(
        createApiUrl(constantsRoutes.profile.deleteAvatar),
        createAxiosConfig(data.headers)
    )
}

export function sendConfirmationEmail(
    data: RequestData<schemasRoutes.profile.SendConfirmationEmailRequest> = {}
) {
    return axios.post<schemasRoutes.profile.SendConfirmationEmailResponse>(
        createApiUrl(constantsRoutes.profile.sendConfirmationEmail),
        {},
        createAxiosConfig(data.headers)
    )
}

export function confirmEmail(data: RequestData<schemasRoutes.profile.ConfirmEmailRequest>) {
    return axios.post<schemasRoutes.profile.ConfirmEmailResponse>(
        createApiUrl(constantsRoutes.profile.confirmEmail, data.emailConfirmationToken),
        {},
        createAxiosConfig(data.headers)
    )
}

export function changePassword(data: RequestData<schemasRoutes.profile.ChangePasswordRequest>) {
    return axios.post<schemasRoutes.profile.ChangePasswordResponse>(
        createApiUrl(constantsRoutes.profile.changePassword),
        {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        },
        createAxiosConfig(data.headers)
    )
}

export function sendPasswordResetEmail(
    data: RequestData<schemasRoutes.profile.SendPasswordResetEmailRequest>
) {
    return axios.post<schemasRoutes.profile.SendPasswordResetEmailResponse>(
        createApiUrl(constantsRoutes.profile.sendPasswordResetEmail),
        {
            email: data.email
        },
        createAxiosConfig(data.headers)
    )
}

export function resetPassword(data: RequestData<schemasRoutes.profile.ResetPasswordRequest>) {
    return axios.post<schemasRoutes.profile.ResetPasswordResponse>(
        createApiUrl(constantsRoutes.profile.resetPassword, data.passwordResetToken),
        {
            newPassword: data.newPassword
        },
        createAxiosConfig(data.headers)
    )
}
