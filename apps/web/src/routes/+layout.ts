import { loadLocaleAsync } from "$i18n/i18n-util.async"

export async function load(e) {
    const { locale, userData } = e.data
    await loadLocaleAsync(locale)
    return { locale, userData }
}
