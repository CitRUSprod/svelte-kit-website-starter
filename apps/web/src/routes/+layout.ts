import { loadLocaleAsync } from "$i18n/helpers"

export async function load(e) {
    const { locale, tz, userData } = e.data
    await loadLocaleAsync(locale)
    return { locale, tz, userData }
}
