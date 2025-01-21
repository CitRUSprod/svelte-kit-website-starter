import { redirect } from "@sveltejs/kit"

import * as api from "$lib/api"
import { setCookies } from "$lib/utils"

export async function load(e) {
    try {
        const res = await api.auth.completeRegistration({
            headers: e.request.headers,
            registrationToken: e.params.token
        })

        setCookies(e.cookies, res.headers)
    } catch {
        redirect(302, `/${e.params.locale as string}`)
    }
}
