import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { RequestData } from "$lib/types"

export function getUsers(data: RequestData<schemasRoutes.users.GetUsersRequest> = {}) {
    return axios.get<schemasRoutes.users.GetUsersResponse>(
        createApiUrl(constantsRoutes.users.getUsers),
        {
            params: {
                page: data.page,
                perPage: data.perPage,
                sort: data.sort,
                order: data.order,
                username: data.username,
                email: data.email
            },
            ...createAxiosConfig(data.headers)
        }
    )
}

export function getUser(data: RequestData<schemasRoutes.users.GetUserRequest>) {
    return axios.get<schemasRoutes.users.GetUserResponse>(
        createApiUrl(constantsRoutes.users.getUser, data.id),
        createAxiosConfig(data.headers)
    )
}

export function assignRoleToUser(data: RequestData<schemasRoutes.users.AssignRoleToUserRequest>) {
    return axios.post<schemasRoutes.users.AssignRoleToUserResponse>(
        createApiUrl(constantsRoutes.users.assignRoleToUser, data.id, data.roleId),
        {},
        createAxiosConfig(data.headers)
    )
}

export function banUser(data: RequestData<schemasRoutes.users.BanUserRequest>) {
    return axios.post<schemasRoutes.users.BanUserResponse>(
        createApiUrl(constantsRoutes.users.banUser, data.id),
        {
            reason: data.reason
        },
        createAxiosConfig(data.headers)
    )
}

export function unbanUser(data: RequestData<schemasRoutes.users.UnbanUserRequest>) {
    return axios.post<schemasRoutes.users.UnbanUserResponse>(
        createApiUrl(constantsRoutes.users.unbanUser, data.id),
        {},
        createAxiosConfig(data.headers)
    )
}
