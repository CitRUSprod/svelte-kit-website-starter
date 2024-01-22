import * as constantsRoutes from "@local/constants/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

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
    return axios.get<ItemsPage<User>>(
        createApiUrl(constantsRoutes.users.getUsers),
        createAxiosConfig(data.headers)
    )
}

interface GetUserData {
    headers?: Headers
    id: number
}

export function getUser(data: GetUserData) {
    return axios.get<User>(
        createApiUrl(constantsRoutes.users.getUser, data.id),
        createAxiosConfig(data.headers)
    )
}

interface AssignRoleToUserData {
    headers?: Headers
    id: number
    roleId: number
}

export function assignRoleToUser(data: AssignRoleToUserData) {
    return axios.post<User>(
        createApiUrl(constantsRoutes.users.assignRoleToUser, data.id, data.roleId),
        createAxiosConfig(data.headers)
    )
}

interface BanUserData {
    headers?: Headers
    id: number
}

export function banUser(data: BanUserData) {
    return axios.post<User>(
        createApiUrl(constantsRoutes.users.banUser, data.id),
        createAxiosConfig(data.headers)
    )
}

interface UnbanUserData {
    headers?: Headers
    id: number
}

export function unbanUser(data: UnbanUserData) {
    return axios.post<User>(
        createApiUrl(constantsRoutes.users.unbanUser, data.id),
        createAxiosConfig(data.headers)
    )
}
