import { setCookiesInHeaders } from "$lib/utils"

export function load(e) {
    setCookiesInHeaders(e)
    return { userData: e.locals.userData }
}
