import { parse } from "set-cookie-parser"
import { getHeader } from "$lib/utils"

import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios"
import type { Cookies, ServerLoadEvent } from "@sveltejs/kit"

export function setCookies(
    cookies: Cookies,
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders
) {
    const rawCookies = getHeader<Array<string>>(headers, "set-cookie") ?? []
    const newCookies = parse(rawCookies)

    for (const { name, value, sameSite, ...opts } of newCookies) {
        if (!("httpOnly" in opts)) opts.httpOnly = false
        cookies.set(name, value, opts)
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

export function setCookiesInHeaders(e: ServerLoadEvent) {
    const newCookies: Array<string> = []
    const cookieList = e.cookies.getAll()

    for (const cookie of cookieList) {
        newCookies.push(`${cookie.name}=${cookie.value}`)
    }

    const oldCookies = e.request.headers.get("cookie")

    const cookies = uniqCookies([...(oldCookies?.split("; ") ?? []), ...newCookies])

    if (cookies.length > 0) {
        e.request.headers.set("cookie", cookies.join("; "))
    }
}
