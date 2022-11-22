import { axios, createAxiosConfig } from "$lib/utils"

import type { User } from "$lib/types"

interface GetUserData {
    headers?: Headers
    id: number
}

export function getUser(data: GetUserData) {
    return axios.get<User>(`/api/users/${data.id}`, createAxiosConfig(data.headers))
}
