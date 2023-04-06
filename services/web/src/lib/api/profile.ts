import { axios, createAxiosConfig } from "$lib/utils"

import type { User } from "$lib/types"

interface GetUserData {
    headers?: Headers
}

export function getUser(data: GetUserData = {}) {
    return axios.get<User>("/api/profile/user", createAxiosConfig(data.headers))
}

interface UpdateUserData {
    headers?: Headers
    email?: string
    username?: string
}

export function updateUser(data: UpdateUserData) {
    return axios.patch<User>(
        "/api/profile/user",
        {
            email: data.email,
            username: data.username
        },
        createAxiosConfig(data.headers)
    )
}

interface UploadAvatarData {
    headers?: Headers
    img: File
}

export function uploadAvatar(data: UploadAvatarData) {
    const fd = new FormData()
    fd.append("img", data.img)
    return axios.post<undefined>("/api/profile/avatar", fd, createAxiosConfig(data.headers))
}

interface DeleteAvatarData {
    headers?: Headers
}

export function deleteAvatar(data: DeleteAvatarData = {}) {
    return axios.delete<undefined>("/api/profile/avatar", createAxiosConfig(data.headers))
}

interface SendConfirmationEmailData {
    headers?: Headers
}

export function sendConfirmationEmail(data: SendConfirmationEmailData = {}) {
    return axios.post<undefined>("/api/profile/email/confirm", {}, createAxiosConfig(data.headers))
}

interface ConfirmEmailData {
    headers?: Headers
    emailConfirmationToken: string
}

export function confirmEmail(data: ConfirmEmailData) {
    return axios.post<undefined>(
        `/api/profile/email/confirm/${data.emailConfirmationToken}`,
        {},
        createAxiosConfig(data.headers)
    )
}

interface ChangePasswordData {
    headers?: Headers
    oldPassword: string
    newPassword: string
}

export function changePassword(data: ChangePasswordData) {
    return axios.post<undefined>(
        "/api/profile/password/change",
        {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        },
        createAxiosConfig(data.headers)
    )
}

interface SendPasswordResetEmailData {
    headers?: Headers
    email: string
}

export function sendPasswordResetEmail(data: SendPasswordResetEmailData) {
    return axios.post<undefined>(
        "/api/profile/password/reset",
        {
            email: data.email
        },
        createAxiosConfig(data.headers)
    )
}

interface ResetPasswordData {
    headers?: Headers
    passwordResetToken: string
    newPassword: string
}

export function resetPassword(data: ResetPasswordData) {
    return axios.post<undefined>(
        `/api/profile/password/reset/${data.passwordResetToken}`,
        {
            newPassword: data.newPassword
        },
        createAxiosConfig(data.headers)
    )
}
