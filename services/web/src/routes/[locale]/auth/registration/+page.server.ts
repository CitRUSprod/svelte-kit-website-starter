import { redirect } from "@sveltejs/kit"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    if (e.locals.userData) {
        throw redirect(302, `/${e.params.locale}`) as unknown
    }
}
