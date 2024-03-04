import { loadLocaleAsync } from "$i18n/helpers"

export async function load(e) {
    const { locale, userData } = e.data
    await loadLocaleAsync(locale)
    return { locale, userData }
}
