import { axios, createAxiosConfig } from "$lib/utils"

import type { Role } from "$lib/types"

interface GetRolesData {
    headers?: Headers
}

export function getRoles(data: GetRolesData = {}) {
    return axios.get<{ items: Array<Role> }>("/api/roles", createAxiosConfig(data.headers))
}
