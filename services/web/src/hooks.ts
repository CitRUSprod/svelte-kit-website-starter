import { cookies, ky } from "$lib/utils"

import type { Handle, GetSession } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
    let cookieArray: Array<string> = []

    try {
        const res = await ky.get("api/auth/user", { headers: request.headers })
        const data = await res.json()

        request.locals.user = data

        cookieArray = cookies.getSetFromHeaders(res.headers)
    } catch {}

    const res = await resolve(request)
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
