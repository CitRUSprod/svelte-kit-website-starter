import { redirect } from "@sveltejs/kit"

export async function load(e) {
    if (e.locals.user) {
        redirect(302, `/${e.params.locale as string}`)
    }

    return { token: e.params.token }
}
