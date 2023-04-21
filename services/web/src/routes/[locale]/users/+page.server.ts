import { qp } from "$lib/utils"
import * as api from "$lib/api"

interface QueryParams {
    page: number
    perPage: number
}

const defaultQuery: QueryParams = {
    page: 1,
    perPage: 10
}

export async function load(e) {
    const query = qp.get(e.url.searchParams, defaultQuery, [], ["page", "perPage"])

    const getUsersRes = await api.users.getUsers({
        headers: e.request.headers,
        ...qp.removeDefault(query, defaultQuery)
    })

    const getRolesRes = await api.roles.getRoles({
        headers: e.request.headers
    })

    return {
        query,
        defaultQuery,
        itemsPage: getUsersRes.data,
        roles: getRolesRes.data.items
    }
}
