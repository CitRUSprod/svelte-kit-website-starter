import { sequence } from "@sveltejs/kit/hooks"
import { defaultLocale, locales } from "$lib/locales"
import { getLocaleAndRoute, setCookies } from "$lib/utils"
import * as api from "$lib/api"

import type { Handle, HandleServerError } from "@sveltejs/kit"
import type { User } from "$lib/types"

const supportedLocales = locales.get()

const localeHandle: Handle = async ({ event: e, resolve }) => {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)

    if (!locale) {
        const lang = e.request.headers.get("accept-language") ?? ""
        const localeCandidate = /^[a-z]{2}\b/.exec(lang)?.toString()
        const isSupportedLocale = !!localeCandidate && supportedLocales.includes(localeCandidate)

        const headers = new Headers()
        headers.set("location", `/${isSupportedLocale ? localeCandidate : defaultLocale}${route}`)

        return new Response(undefined, { status: 301, headers })
    }

    const response = await resolve(e, {
        transformPageChunk({ html }) {
            return html.replace(/<html.*>/, `<html lang="${locale}">`)
        }
    })

    return response
}

const authHandle: Handle = async ({ event: e, resolve }) => {
    let userData: User | null = null

    try {
        const res = await api.profile.getUser({ headers: e.request.headers })
        setCookies(e.cookies, res.headers)

        userData = res.data
    } catch {}

    e.locals.userData = userData

    const response = await resolve(e)

    return response
}

export const handle = sequence(localeHandle, authHandle)

export const handleError: HandleServerError = ({ error: err }) => ({
    message: (err as any).message
})
