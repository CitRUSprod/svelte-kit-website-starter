import * as constantsRoutes from "@local/constants/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { Permission } from "$lib/enums"

interface GetPermissionsData {
    headers?: Headers
}

export function getPermissions(data: GetPermissionsData = {}) {
    return axios.get<{ items: Array<Permission> }>(
        createApiUrl(constantsRoutes.permissions.getPermissions),
        createAxiosConfig(data.headers)
    )
}
