import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

export async function load(e) {
    try {
        await api.profile.confirmEmail({
            headers: e.request.headers,
            emailConfirmationToken: e.params.token
        })
    } catch {
        redirect(302, `/${e.params.locale as string}`)
    }
}
