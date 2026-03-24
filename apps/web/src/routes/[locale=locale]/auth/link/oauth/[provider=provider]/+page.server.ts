import { redirect } from "@sveltejs/kit"
import * as _ from "es-toolkit"

import { env } from "$lib/constants"

export async function load(e) {
    if (!env.PUBLIC_ENABLE_TWITCH_AUTH) {
        redirect(302, `/${e.params.locale as string}`)
    }

    if (!e.locals.user) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProvider = _.upperFirst(_.camelCase(e.params.provider))

    e.cookies.set("link-account", oAuthProvider, {
        path: "/",
        sameSite: "lax",
        httpOnly: false
    })

    redirect(302, `/${e.params.locale as string}/auth/login/${_.kebabCase(oAuthProvider)}`)
}
