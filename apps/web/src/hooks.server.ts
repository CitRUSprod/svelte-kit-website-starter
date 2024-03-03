import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors"
import * as schemasModels from "@local/schemas/models"
import { base } from "$app/paths"
import { getPathnameWithoutBase, type Locales } from "$i18n/helpers"
import { detectLocale, i18n, isLocale } from "$i18n/i18n-util"
import { loadAllLocales } from "$i18n/i18n-util.sync"
import { setCookies, uniqCookies } from "$lib/utils"
import * as api from "$lib/api"

loadAllLocales()
const l = i18n()

function getPreferredLocale({ request }: RequestEvent) {
    const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)
    return detectLocale(acceptLanguageDetector)
}

const localeAndThemeHandle: Handle = async ({ event: e, resolve }) => {
    const [, lang] = getPathnameWithoutBase(e.url).split("/")

    if (!lang) {
        const locale = getPreferredLocale(e)
        redirect(307, `${base}/${String(locale)}`)
    }

    const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(e)
    const ll = l[locale]

    e.locals.locale = locale
    e.locals.ll = ll

    const dark = e.cookies.get("darkTheme") === "true"

    const response = await resolve(e, {
        transformPageChunk({ html }) {
            return html.replace(
                /<html.*>/,
                `<html lang="${String(locale)}"${dark ? ' class="dark"' : ""}>`
            )
        }
    })

    const setCookie = response.headers.get("set-cookie")
    const newCookie = `locale=${String(locale)}; Path=/; Max-Age=${100 * 24 * 60 * 60}`
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
