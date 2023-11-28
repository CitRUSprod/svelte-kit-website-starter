import { axios, createAxiosConfig } from "$lib/utils"

import type { Permission } from "$lib/enums"

interface GetPermissionsData {
    headers?: Headers
}

export function getPermissions(data: GetPermissionsData = {}) {
    return axios.get<{ items: Array<Permission> }>(
        "/api/permissions",
        createAxiosConfig(data.headers)
    )
}
