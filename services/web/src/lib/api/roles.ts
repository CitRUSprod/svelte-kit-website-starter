import { axios, createAxiosConfig } from "$lib/utils"

import type { Permission } from "$lib/enums"
import type { RoleWithProtected } from "$lib/types"

interface GetRolesData {
    headers?: Headers
}

export function getRoles(data: GetRolesData = {}) {
    return axios.get<{ items: Array<RoleWithProtected> }>(
        "/api/roles",
        createAxiosConfig(data.headers)
    )
}

interface CreateRoleData {
    headers?: Headers
    name: string
    permissions: Array<Permission>
}

export function createRole(data: CreateRoleData) {
    return axios.post<RoleWithProtected>(
        "/api/roles",
        {
            name: data.name,
            permissions: data.permissions
        },
        createAxiosConfig(data.headers)
    )
}

interface UpdateRoleData {
    headers?: Headers
    id: number
    name?: string
    permissions?: Array<Permission>
}

export function updateRole(data: UpdateRoleData) {
    return axios.patch<RoleWithProtected>(
        `/api/roles/${data.id}`,
        {
            name: data.name,
            permissions: data.permissions
        },
        createAxiosConfig(data.headers)
    )
}

interface DeleteRoleData {
    headers?: Headers
    id: number
}

export function deleteRole(data: DeleteRoleData) {
    return axios.delete<RoleWithProtected>(`/api/roles/${data.id}`, createAxiosConfig(data.headers))
}
