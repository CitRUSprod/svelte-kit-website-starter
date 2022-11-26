import { loadTranslations } from "$lib/locales"
import { getLocaleAndRoute } from "$lib/utils"

import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async e => {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)
    await loadTranslations(locale!, route)

    const { userData } = e.data

    return { route, userData }
}
