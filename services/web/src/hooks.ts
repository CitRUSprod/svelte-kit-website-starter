import { dev } from "$app/env"
import { cookies, fetchy } from "$lib/utils"

import type { Handle, GetSession } from "@sveltejs/kit"

const host = `${dev ? "localhost" : "nginx"}:6700`

export const handle: Handle = async ({ request, resolve }) => {
    request.host = host
    const headers = new Headers(request.headers)

    let cookieArray: Array<string> = []

    try {
        const res = await fetchy.get("/api/auth/user", { headers })
        const data = await res.json()

        request.locals.user = data

        cookieArray = cookies.getSetFromHeaders(res.headers)
    } catch {}

    const cookie = cookies.merge(
        headers.get("cookie")?.split("; "),
        cookies.getKeyValuePairs(cookieArray)
    )

    const res = await resolve({
        ...request,
        headers: {
            ...request.headers,
            ...(cookie.length ? { cookie: cookie.join("; ") } : {})
        }
    })
    cookieArray = cookies.merge(cookieArray, cookies.getSetFromHeaders(res.headers))

    return {
        ...res,
        headers: {
            ...res.headers,
            "set-cookie": cookieArray
        }
    }
}

export const getSession: GetSession = req => ({ user: req.locals.user ?? null })
