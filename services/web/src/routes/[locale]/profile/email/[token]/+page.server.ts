import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    try {
        await api.profile.confirmEmail({
            headers: e.request.headers,
            emailConfirmationToken: e.params.token
        })
    } catch {
        throw redirect(302, `/${e.params.locale}`)
    }
}
