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

    for (const { name, value, sameSite, path, ...opts } of newCookies) {
        if (!("httpOnly" in opts)) {
            opts.httpOnly = false
        }
        if (path) {
            cookies.set(name, value, { path, ...opts })
        }
    }
}

export function uniqCookies(cookies: Array<string>) {
    const cookiesObject: Record<string, string> = {}

    for (const cookie of cookies) {
        const parsedCookie = parse(cookie)[0]
        cookiesObject[parsedCookie.name] = cookie
    }

    return Object.values(cookiesObject)
}
