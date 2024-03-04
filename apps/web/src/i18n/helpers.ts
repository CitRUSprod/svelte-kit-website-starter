import { derived } from "svelte/store"
import { base } from "$app/paths"
import ll, { locale as currentLocale, setLocale } from "./i18n-svelte"
import { locales, detectLocale, i18n, isLocale } from "./i18n-util"
import { loadLocaleAsync } from "./i18n-util.async"
import { loadAllLocales } from "./i18n-util.sync"

import type { Locales, TranslationFunctions } from "$i18n/i18n-types"

export {
    ll,
    currentLocale,
    locales,
    setLocale,
    loadLocaleAsync,
    loadAllLocales,
    detectLocale,
    i18n,
    isLocale
}
export type { Locales, TranslationFunctions }

export const localePath = derived(
    currentLocale,
    l => (path: string, locale?: string) => `/${locale ?? l}${path === "/" ? "" : path}`
)

export function getPathnameWithoutBase(url: URL) {
    return url.pathname.replace(new RegExp(`^${base}`), "")
}

export function replaceLocaleInUrl(url: URL, locale: string) {
    const [, , ...rest] = getPathnameWithoutBase(url).split("/")
    const newPathname = `/${[locale, ...rest].join("/")}`
    return `${newPathname}${url.search}`
}
