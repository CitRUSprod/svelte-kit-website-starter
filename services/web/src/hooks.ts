import { cookies, axios } from "$lib/utils"

import type { Handle, GetSession } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
    let cookieArray: Array<string> = []

    try {
        const { data, headers } = await axios.get("/api/auth/user", {
            headers: request.headers
        })

        request.locals.user = data

        if (headers["set-cookie"]) {
            cookieArray.push(...headers["set-cookie"])
        }
    } catch (err: unknown) {}

    const res = await resolve(request)
    cookieArray = cookies.merge(cookieArray, res.headers["set-cookie"] as Array<string> | undefined)

    return {
        ...res,
        headers: {
            ...res.headers,
            "set-cookie": cookieArray
        }
    }
}

export const getSession: GetSession = req => ({ user: req.locals.user ?? null })
