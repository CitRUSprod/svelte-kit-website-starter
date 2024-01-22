/* eslint-disable @typescript-eslint/no-invalid-void-type */

import * as constantsRoutes from "@local/constants/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { User } from "$lib/types"

interface GetUserData {
    headers?: Headers
}

export function getUser(data: GetUserData = {}) {
    return axios.get<User>(
        createApiUrl(constantsRoutes.profile.getUser),
        createAxiosConfig(data.headers)
    )
}

interface UpdateUserData {
    headers?: Headers
    email?: string
    username?: string
}

export function updateUser(data: UpdateUserData) {
    return axios.patch<User>(
        createApiUrl(constantsRoutes.profile.updateUser),
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
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.uploadAvatar),
        fd,
        createAxiosConfig(data.headers)
    )
}

interface DeleteAvatarData {
    headers?: Headers
}

export function deleteAvatar(data: DeleteAvatarData = {}) {
    return axios.delete<void>(
        createApiUrl(constantsRoutes.profile.deleteAvatar),
        createAxiosConfig(data.headers)
    )
}

interface SendConfirmationEmailData {
    headers?: Headers
}

export function sendConfirmationEmail(data: SendConfirmationEmailData = {}) {
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.sendConfirmationEmail),
        {},
        createAxiosConfig(data.headers)
    )
}

interface ConfirmEmailData {
    headers?: Headers
    emailConfirmationToken: string
}

export function confirmEmail(data: ConfirmEmailData) {
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.confirmEmail, data.emailConfirmationToken),
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
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.changePassword),
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
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.sendPasswordResetEmail),
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
    return axios.post<void>(
        createApiUrl(constantsRoutes.profile.resetPassword, data.passwordResetToken),
        {
            newPassword: data.newPassword
        },
        createAxiosConfig(data.headers)
    )
}
