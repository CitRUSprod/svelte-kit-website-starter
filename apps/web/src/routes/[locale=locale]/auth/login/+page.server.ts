import { redirect } from "@sveltejs/kit"

export async function load(e) {
    if (e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }
}
