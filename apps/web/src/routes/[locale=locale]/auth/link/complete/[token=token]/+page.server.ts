import { redirect } from "@sveltejs/kit"

import * as api from "$lib/api"
import { setCookies } from "$lib/utils"

export async function load(e) {
    try {
        const res = await api.auth.completeLinking({
            headers: e.request.headers,
            linkingToken: e.params.token
        })

        setCookies(e.cookies, res.headers)
    } catch (err: any) {
        console.error(err.response.data)
        redirect(302, `/${e.params.locale as string}`)
    }
}
