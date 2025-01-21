import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"

import type { RequestData } from "$lib/types"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

export function getRoles(data: RequestData<schemasRoutes.roles.GetRolesRequest> = {}) {
    return axios.get<schemasRoutes.roles.GetRolesResponse>(
        createApiUrl(constantsRoutes.roles.getRoles),
        createAxiosConfig(data.headers)
    )
}

export function createRole(data: RequestData<schemasRoutes.roles.CreateRoleRequest>) {
    return axios.post<schemasRoutes.roles.CreateRoleResponse>(
        createApiUrl(constantsRoutes.roles.createRole),
        {
            name: data.name,
            permissions: data.permissions
        },
        createAxiosConfig(data.headers)
    )
}

export function updateRole(data: RequestData<schemasRoutes.roles.UpdateRoleRequest>) {
    return axios.patch<schemasRoutes.roles.UpdateRoleResponse>(
        createApiUrl(constantsRoutes.roles.updateRole, data.id),
        {
            name: data.name,
            permissions: data.permissions
        },
        createAxiosConfig(data.headers)
    )
}

export function deleteRole(data: RequestData<schemasRoutes.roles.DeleteRoleRequest>) {
    return axios.delete<schemasRoutes.roles.DeleteRoleResponse>(
        createApiUrl(constantsRoutes.roles.deleteRole, data.id),
        createAxiosConfig(data.headers)
    )
}
