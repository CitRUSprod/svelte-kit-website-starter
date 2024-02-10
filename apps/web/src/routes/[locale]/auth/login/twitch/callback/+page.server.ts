import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    if (e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const code = e.url.searchParams.get("code")
    const state = e.url.searchParams.get("state")

    if (!code || !state) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.loginWithTwitchCallback({ headers: e.request.headers, code, state })
    setCookies(e.cookies, res.headers)

    if (res.data.oAuthRegistrationToken) {
        redirect(
            302,
            `/${e.params.locale as string}/auth/registration/${res.data.oAuthRegistrationToken}`
        )
    } else {
        redirect(302, `/${e.params.locale as string}`)
    }
}
