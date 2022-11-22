import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    try {
        const res = await api.auth.logout({ headers: e.request.headers })
        setCookies(e.cookies, res.headers)
    } catch {}
}
