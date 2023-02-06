import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    if (!e.locals.userData) {
        throw redirect(302, `/${e.params.locale}`) as unknown
    }

    const res = await api.auth.logout({ headers: e.request.headers })
    setCookies(e.cookies, res.headers)
}
