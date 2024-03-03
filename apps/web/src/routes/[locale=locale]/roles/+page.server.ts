import { redirect } from "@sveltejs/kit"
import * as constantsEnums from "@local/constants/enums"
import * as api from "$lib/api"

export async function load(e) {
    if (!e.locals.userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.roles.getRoles({
        headers: e.request.headers
    })

    return {
        roles: res.data.items
    }
}
