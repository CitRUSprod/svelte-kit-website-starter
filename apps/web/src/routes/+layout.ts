import { loadLocaleAsync } from "$i18n/helpers"

export async function load(e) {
    const { locale, tz, user } = e.data
    await loadLocaleAsync(locale)
    return { locale, tz, user }
}
