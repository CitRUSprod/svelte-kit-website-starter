import { loadTranslations } from "$lib/locales"
import { getLocaleAndRoute } from "$lib/utils"

import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ url }) => {
    const { locale, route } = getLocaleAndRoute(url.pathname)
    await loadTranslations(locale!, route)
    return { route }
}
