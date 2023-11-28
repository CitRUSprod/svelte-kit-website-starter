import { loadTranslations } from "$lib/locales"
import { getLocaleAndRoute } from "$lib/utils"

export async function load(e) {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)
    await loadTranslations(locale!, route)

    const { userData } = e.data

    return { route, userData }
}
