import { redirect } from "@sveltejs/kit"
import { setCookies } from "$lib/utils"
import * as api from "$lib/api"

export async function load(e) {
    if (!e.locals.userData) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect(302, `/${e.params.locale as string}`)
    }

    const res = await api.auth.logout({ headers: e.request.headers })
    setCookies(e.cookies, res.headers)
}
