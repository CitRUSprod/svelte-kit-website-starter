import { parse as cookieParse } from "cookie"
import { getUser } from "$lib/utils/auth"

import type { GetSession } from "@sveltejs/kit"

export const getSession: GetSession = async req => {
    const { token } = cookieParse((req.headers.cookie as string | undefined) ?? "")

    if (!token) {
        return { user: null }
    }

    const user = await getUser(token)

    return { user }
}
