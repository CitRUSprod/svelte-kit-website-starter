import * as constantsEnums from "@repo/constants/enums"
import * as schemasRoutes from "@repo/schemas/routes"
import { redirect } from "@sveltejs/kit"

import * as api from "$lib/api"

export async function load(e) {
    if (
        !e.locals.userData?.role.permissions.includes(constantsEnums.Permission.GetOtherUserEmail)
    ) {
        redirect(302, `/${e.params.locale as string}`)
    }

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
