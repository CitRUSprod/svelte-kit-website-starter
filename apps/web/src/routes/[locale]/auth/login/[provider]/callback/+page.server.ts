// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { redirect } from "@sveltejs/kit"
import * as constantsEnums from "@local/constants/enums"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    if (e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProvider = _.startCase(e.params.provider)

    if (!Object.values(constantsEnums.OAuthProvider).includes(oAuthProvider)) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const code = e.url.searchParams.get("code")
    const state = e.url.searchParams.get("state")

    if (!code || !state) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.oAuthLoginCallback({
        headers: e.request.headers,
        provider: e.params.provider,
        code,
        oAuthState: state
    })
    setCookies(e.cookies, res.headers)

    if (!res.data.oAuthRegistrationToken) {
        redirect(302, `/${e.params.locale as string}`)
    }

    redirect(
        302,
        `/${e.params.locale as string}/auth/registration/${res.data.oAuthRegistrationToken}`
    )
}
