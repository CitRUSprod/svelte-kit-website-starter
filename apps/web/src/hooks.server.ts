import * as schemasModels from "@local/schemas/models"
import type { Handle, RequestEvent } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { detectLocale, initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors"

import type { Locale } from "$i18n/helpers"
import { defaultLocale, locales, i18n, isLocale, loadAllLocales } from "$i18n/helpers"
import * as api from "$lib/api"
import { setCookies, uniqCookies } from "$lib/utils"

loadAllLocales()

const l = i18n()

function getPreferredLocale(e: RequestEvent) {
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(e.request)
    return detectLocale(defaultLocale, locales, acceptLanguageDetector)
}

const localeAndThemeHandle: Handle = async ({ event: e, resolve }) => {
    const [, locale, ...pathname] = e.url.pathname.split("/")

    if (!(locale && isLocale(locale))) {
        const localeFromCookie = e.cookies.get("locale")

        let localLocale: Locale

        if (localeFromCookie && isLocale(localeFromCookie)) {
            localLocale = localeFromCookie
        } else {
            localLocale = getPreferredLocale(e)
        }

        const localPathname = pathname.length > 0 ? `/${pathname.join("/")}` : ""

        redirect(307, `/${localLocale}${locale ? `/${locale}` : ""}${localPathname}${e.url.search}`)
    }

    const ll = l[locale]

    e.locals.locale = locale
    e.locals.ll = ll

    const tz = e.cookies.get("timezone") ?? "Europe/Moscow"

    e.locals.tz = tz

    const dark = e.cookies.get("darkTheme") === "true"

    const response = await resolve(e, {
        transformPageChunk({ html }) {
            const template = `<html lang="${locale}"${dark ? ' class="dark"' : ""}>`
            return html.replace(/<html.*>/, template)
        }
    })

    const setCookie = response.headers.get("set-cookie")
    const newCookie = `locale=${locale}; Path=/; Max-Age=${100 * 24 * 60 * 60}; SameSite=Lax`
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
