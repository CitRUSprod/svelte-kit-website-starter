import { redirect } from "@sveltejs/kit"
import { Permission } from "$lib/enums"
import * as api from "$lib/api"

export async function load(e) {
    if (!e.locals.userData?.role.permissions.includes(Permission.AssignRole)) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect(302, `/${e.params.locale as string}`)
    }

    const getRolesRes = await api.roles.getRoles({
        headers: e.request.headers
    })

    const getPermissionsRes = await api.permissions.getPermissions({
        headers: e.request.headers
    })

    return {
        roles: getRolesRes.data.items,
        permissions: getPermissionsRes.data.items
    }
}
