import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    if (e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.loginWithTwitch({ headers: e.request.headers })
    setCookies(e.cookies, res.headers)
    redirect(302, res.data.redirectUrl)
}
