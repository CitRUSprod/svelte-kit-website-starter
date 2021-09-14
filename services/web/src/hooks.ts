import { parse as cookieParse } from "cookie"
import axios from "$lib/utils/axios"

import type { Handle, GetSession } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
    const cookie = (request.headers.cookie as string | undefined) ?? ""
    const { accessToken, refreshToken } = cookieParse(cookie)
    const cookieArray: Array<string> = []

    if (refreshToken) {
        try {
            const { data, headers } = await axios.get("/api/auth/user", {
                headers: {
                    ...request.headers,
                    authorization: `Bearer ${accessToken}`
                }
            })

            request.locals.user = data
            cookieArray.push(...(headers["set-cookie"] ?? []))
        } catch (err: unknown) {}
    }

    const res = await resolve(request)
    cookieArray.push(...((res.headers["set-cookie"] as Array<string> | undefined) ?? []))

    return {
        ...res,
        headers: {
            ...res.headers,
            "set-cookie": cookieArray
        }
    }
}

export const getSession: GetSession = req => ({ user: req.locals.user ?? null })
