import { parse as cookieParse } from "cookie"
import axios from "$lib/utils/axios"

import type { Handle, GetSession } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
    const { accessToken } = cookieParse((request.headers.cookie as string | undefined) ?? "")

    if (accessToken) {
        const { data } = await axios.get("/api/auth/user", {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        request.locals.user = data
    }

    const response = await resolve(request)

    return response
}

export const getSession: GetSession = req => ({ user: req.locals.user ?? null })
