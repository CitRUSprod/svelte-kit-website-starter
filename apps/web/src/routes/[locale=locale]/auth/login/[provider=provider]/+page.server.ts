// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { redirect } from "@sveltejs/kit"
import * as constantsEnums from "@local/constants/enums"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    const oAuthProviderFromCookie = e.cookies.get("link-account")

    if (e.locals.userData && !oAuthProviderFromCookie) {
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