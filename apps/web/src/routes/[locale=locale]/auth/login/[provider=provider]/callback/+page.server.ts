// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { AxiosError } from "axios"
import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

interface CallbackReturn {
    error: string | null
    provider: string | null
}

export async function load(e): Promise<CallbackReturn> {
    const oAuthProviderFromCookie = e.cookies.get("link-account")

    if (e.locals.userData && !oAuthProviderFromCookie) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProvider = _.upperFirst(_.camelCase(e.params.provider))

    if (oAuthProviderFromCookie && oAuthProviderFromCookie !== oAuthProvider) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const code = e.url.searchParams.get("code")
    const state = e.url.searchParams.get("state")

    if (!code || !state) {
        redirect(302, `/${e.params.locale as string}`)
    }

    if (e.locals.userData) {
        e.cookies.delete("link-account", { path: "/" })

        try {
            const res = await api.auth.oAuthLinkCallback({
                headers: e.request.headers,
                provider: e.params.provider,
                code,
                oAuthState: state
            })
            setCookies(e.cookies, res.headers)

            return {
                error: null,
                provider: oAuthProvider
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.headers && err.response.data?.message) {
                    setCookies(e.cookies, err.response.headers)

                    return {
                        error: err.response.data.message as string,
                        provider: oAuthProvider
                    }
                } else {
                    throw err
                }
            } else {
                throw err
            }
        }
    } else {
        const res = await api.auth.oAuthLoginCallback({
            headers: e.request.headers,
            provider: e.params.provider,
            code,
            oAuthState: state
        })
        setCookies(e.cookies, res.headers)

        if (res.data.oAuthRegistrationToken) {
            redirect(
                302,
                `/${e.params.locale as string}/auth/registration/oauth/${res.data.oAuthRegistrationToken}`
            )
        }

        return {
            error: null,
            provider: null
        }
    }
}
