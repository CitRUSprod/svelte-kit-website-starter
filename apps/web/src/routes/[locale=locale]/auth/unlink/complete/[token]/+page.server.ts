import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    try {
        const res = await api.auth.completeUnlinking({
            headers: e.request.headers,
            unlinkingToken: e.params.token
        })

        setCookies(e.cookies, res.headers)
    } catch {
        redirect(302, `/${e.params.locale as string}`)
    }
}
