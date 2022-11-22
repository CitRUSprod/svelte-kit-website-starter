import { parse } from "set-cookie-parser"
import { getHeader } from "$lib/utils"

import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios"
import type { Cookies } from "@sveltejs/kit"

export function setCookies(
    cookies: Cookies,
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders
) {
    const rawCookies = getHeader<Array<string>>(headers, "set-cookie") ?? []
    const newCookies = parse(rawCookies)

    for (const { name, value, sameSite, ...opts } of newCookies) {
        cookies.set(name, value, opts)
    }
}
