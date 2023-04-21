import { redirect } from "@sveltejs/kit"

export async function load(e) {
    if (e.locals.userData) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect(302, `/${e.params.locale as string}`)
    }
}
