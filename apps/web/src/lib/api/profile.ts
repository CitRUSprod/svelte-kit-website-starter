import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"

import type { RequestData } from "$lib/types"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

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
            username: data.username
        },
        createAxiosConfig(data.headers)
    )
}

export function deleteUser(data: RequestData<schemasRoutes.profile.DeleteUserRequest> = {}) {
    return axios.delete<schemasRoutes.profile.DeleteUserResponse>(
        createApiUrl(constantsRoutes.profile.deleteUser),
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

export function sendEmailUpdateEmailToOld(
    data: RequestData<schemasRoutes.profile.SendEmailUpdateEmailToOldRequest>
) {
    return axios.post<schemasRoutes.profile.SendEmailUpdateEmailToOldResponse>(
        createApiUrl(constantsRoutes.profile.sendEmailUpdateEmailToOld),
        {
            email: data.email
        },
        createAxiosConfig(data.headers)
    )
}

export function sendEmailUpdateEmailToNew(
    data: RequestData<schemasRoutes.profile.SendEmailUpdateEmailToNewRequest>
) {
    return axios.post<schemasRoutes.profile.SendEmailUpdateEmailToNewResponse>(
        createApiUrl(constantsRoutes.profile.sendEmailUpdateEmailToNew, data.emailUpdateToken),
        {},
        createAxiosConfig(data.headers)
    )
}

export function updateEmail(data: RequestData<schemasRoutes.profile.UpdateEmailRequest>) {
    return axios.post<schemasRoutes.profile.UpdateEmailResponse>(
        createApiUrl(constantsRoutes.profile.updateEmail, data.emailUpdateToken),
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
