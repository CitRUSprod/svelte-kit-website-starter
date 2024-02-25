import { sequence } from "@sveltejs/kit/hooks"
import * as schemasModels from "@local/schemas/models"
import { defaultLocale, locales } from "$lib/locales"
import { getLocaleAndRoute, setCookies, uniqCookies } from "$lib/utils"
import * as api from "$lib/api"

import type { Handle } from "@sveltejs/kit"

const supportedLocales = locales.get()

function isSupportedLocale(locale: string | undefined): locale is string {
    return !!locale && supportedLocales.includes(locale)
}

const localeAndThemeHandle: Handle = async ({ event: e, resolve }) => {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)

    if (!locale) {
        const localeFromCookie = e.cookies.get("locale")

        const acceptLanguage = e.request.headers.get("accept-language") ?? ""
        const localeFromAcceptLanguage = /^[a-z]{2}\b/.exec(acceptLanguage)?.toString()

        let localLocale: string

        if (isSupportedLocale(localeFromCookie)) {
            localLocale = localeFromCookie
        } else if (isSupportedLocale(localeFromAcceptLanguage)) {
            localLocale = localeFromAcceptLanguage
        } else {
            localLocale = defaultLocale
        }

        const headers = new Headers()
        headers.set("location", `/${localLocale}${route}${e.url.search}`)

        return new Response(undefined, { status: 302, headers })
    }

    const dark = e.cookies.get("darkTheme") === "true"

    const response = await resolve(e, {
        transformPageChunk({ html }) {
            return html.replace(/<html.*>/, `<html lang="${locale}"${dark ? ' class="dark"' : ""}>`)
        }
    })

    const setCookie = response.headers.get("set-cookie")
    const newCookie = `locale=${locale}; Path=/; Max-Age=${100 * 24 * 60 * 60}`
    response.headers.set("set-cookie", setCookie ? `${setCookie}, ${newCookie}` : newCookie)

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

export const handle = sequence(localeAndThemeHandle, authHandle)

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
