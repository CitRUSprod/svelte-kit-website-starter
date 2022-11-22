import { axios, createAxiosConfig } from "$lib/utils"

import type { User } from "$lib/types"

interface GetUserData {
    headers?: Headers
}

export function getUser(data: GetUserData = {}) {
    return axios.get<User>("/api/profile/user", createAxiosConfig(data.headers))
}
