import { setCookiesInHeaders } from "$lib/utils"

import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = e => {
    setCookiesInHeaders(e)
    return { user: e.locals.user }
}
