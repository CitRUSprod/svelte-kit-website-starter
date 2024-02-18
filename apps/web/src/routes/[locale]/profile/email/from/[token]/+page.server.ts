import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

export async function load(e) {
    try {
        await api.profile.sendEmailUpdateEmailToNew({
            headers: e.request.headers,
            emailUpdateToken: e.params.token
        })
    } catch {
        redirect(302, `/${e.params.locale as string}`)
    }
}
