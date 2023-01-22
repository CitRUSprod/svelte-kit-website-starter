import { axios, createAxiosConfig } from "$lib/utils"

import type { ItemsPage, User } from "$lib/types"

interface GetUsersData {
    headers?: Headers
    page?: number
    perPage?: number
    sort?: string
    order?: string
    email?: string
    username?: string
}

export function getUsers(data: GetUsersData) {
    return axios.get<ItemsPage<User>>("/api/users", createAxiosConfig(data.headers))
}

interface GetUserData {
    headers?: Headers
    id: number
}

export function getUser(data: GetUserData) {
    return axios.get<User>(`/api/users/${data.id}`, createAxiosConfig(data.headers))
}

interface AssignRoleToUserData {
    headers?: Headers
    id: number
    roleId: number
}

export function assignRoleToUser(data: AssignRoleToUserData) {
    return axios.post<User>(
        `/api/users/${data.id}/role/${data.roleId}`,
        createAxiosConfig(data.headers)
    )
}

interface BanUserData {
    headers?: Headers
    id: number
}

export function banUser(data: BanUserData) {
    return axios.post<User>(`/api/users/${data.id}/ban`, createAxiosConfig(data.headers))
}

interface UnbanUserData {
    headers?: Headers
    id: number
}

export function unbanUser(data: UnbanUserData) {
    return axios.post<User>(`/api/users/${data.id}/unban`, createAxiosConfig(data.headers))
}
