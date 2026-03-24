import * as constantsEnums from "@repo/constants/enums"
import { redirect } from "@sveltejs/kit"
import * as _ from "es-toolkit"

import * as api from "$lib/api"
import { env } from "$lib/constants"
import { setCookies } from "$lib/utils"

export async function load(e) {
    if (!env.PUBLIC_ENABLE_TWITCH_AUTH) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProviderFromCookie = e.cookies.get("link-account")

    if (e.locals.user && !oAuthProviderFromCookie) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProvider = _.upperFirst(_.camelCase(e.params.provider))

    if (!Object.values(constantsEnums.OAuthProvider).includes(oAuthProvider)) {
        redirect(302, `/${e.params.locale as string}`)
    }

    if (oAuthProviderFromCookie && oAuthProviderFromCookie !== oAuthProvider) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.oAuthLogin({
        headers: e.request.headers,
        provider: e.params.provider
    })
    setCookies(e.cookies, res.headers)
    redirect(302, res.data.redirectUrl)
}
