import { derived } from "svelte/store"
import { base } from "$app/paths"
import ll, { locale as currentLocale, setLocale } from "./i18n-svelte"
import { locales } from "./i18n-util"
import { loadLocaleAsync } from "./i18n-util.async"

import type { Locales } from "$i18n/i18n-types"

export { ll, currentLocale, locales, setLocale, loadLocaleAsync }
export type { Locales }

export const localePath = derived(
    currentLocale,
    l => (path: string, locale?: string) => `/${locale ?? l}${path === "/" ? "" : path}`
)

export function getPathnameWithoutBase(url: URL) {
    return url.pathname.replace(new RegExp(`^${base}`), "")
}

export function replaceLocaleInUrl(url: URL, locale: string, full = false) {
    const [, , ...rest] = getPathnameWithoutBase(url).split("/")
    const newPathname = `/${[locale, ...rest].join("/")}`

    if (!full) {
        return `${newPathname}${url.search}`
    }

    const newUrl = new URL(url.toString())
    newUrl.pathname = base + newPathname
    return newUrl.toString()
}
