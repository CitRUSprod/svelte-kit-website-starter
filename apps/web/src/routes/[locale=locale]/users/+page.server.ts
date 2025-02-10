import * as schemasRoutes from "@local/schemas/routes"

import * as api from "$lib/api"

export async function load(e) {
    const schema = schemasRoutes.users.getUsersQuery()

    const getUsersRes = await api.users.getUsers({
        headers: e.request.headers,
        ...schema.parse(Object.fromEntries(e.url.searchParams))
    })

    const getRolesRes = await api.roles.getRoles({
        headers: e.request.headers
    })

    return { itemsPage: getUsersRes.data, roles: getRolesRes.data.items }
}
