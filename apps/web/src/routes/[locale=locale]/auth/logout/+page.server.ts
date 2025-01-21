import { redirect } from "@sveltejs/kit"

import * as api from "$lib/api"
import { setCookies } from "$lib/utils"

export async function load(e) {
    if (!e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.logout({ headers: e.request.headers })
    setCookies(e.cookies, res.headers)
}
