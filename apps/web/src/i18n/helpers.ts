import { derived } from "svelte/store"

import ll, { locale as currentLocale, setLocale } from "$i18n/i18n-svelte"
import type { Locales as Locale, TranslationFunctions } from "$i18n/i18n-types"
import { locales, i18n, isLocale } from "$i18n/i18n-util"
import { loadLocaleAsync } from "$i18n/i18n-util.async"
import { loadAllLocales } from "$i18n/i18n-util.sync"

export { ll, currentLocale, locales, setLocale, loadLocaleAsync, loadAllLocales, i18n, isLocale }
export type { Locale, TranslationFunctions }

export const defaultLocale: Locale = "en"

export const localePath = derived(
    currentLocale,
    l => (path: string, locale?: string) => `/${locale ?? l}${path === "/" ? "" : path}`
)

export function replaceLocaleInUrl(url: URL, locale: string) {
    const [, , ...rest] = url.pathname.split("/")
    const newPathname = `/${[locale, ...rest].join("/")}`
    return `${newPathname}${url.search}`
}
