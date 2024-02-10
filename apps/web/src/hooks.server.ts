import { sequence } from "@sveltejs/kit/hooks"
import * as schemasModels from "@local/schemas/models"
import { defaultLocale, locales } from "$lib/locales"
import { getLocaleAndRoute, setCookies, uniqCookies } from "$lib/utils"
import * as api from "$lib/api"

import type { Handle } from "@sveltejs/kit"

const supportedLocales = locales.get()

const localeHandle: Handle = async ({ event: e, resolve }) => {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)

    if (!locale) {
        const lang = e.request.headers.get("accept-language") ?? ""
        const localeCandidate = /^[a-z]{2}\b/.exec(lang)?.toString()
        const isSupportedLocale = !!localeCandidate && supportedLocales.includes(localeCandidate)

        const headers = new Headers()
        headers.set(
            "location",
            `/${isSupportedLocale ? localeCandidate : defaultLocale}${route}${e.url.search}`
        )

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
    let userData: schemasModels.user.User | null = null

    try {
        const res = await api.profile.getUser({ headers: e.request.headers })
        setCookies(e.cookies, res.headers)

        userData = res.data
    } catch {}

    const newCookies: Array<string> = []
    const cookieList = e.cookies.getAll()

    for (const cookie of cookieList) {
        newCookies.push(`${cookie.name}=${cookie.value}`)
    }

    const oldCookies = e.request.headers.get("cookie")?.split("; ") ?? []

    const cookies = uniqCookies([...oldCookies, ...newCookies])

    if (cookies.length > 0) {
        e.request.headers.set("cookie", cookies.join("; "))
    }

    e.locals.userData = userData

    const response = await resolve(e)

    return response
}

export const handle = sequence(localeHandle, authHandle)

export function handleError({ error }) {
    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
    ) {
        return { message: error.message }
    } else {
        return { message: "Unexpected error" }
    }
}
