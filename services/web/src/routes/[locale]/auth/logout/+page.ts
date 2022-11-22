import { redirect } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { goto } from "$app/navigation"

import type { PageLoad } from "./$types"

export const load: PageLoad = async e => {
    const url = `/${e.params.locale}`

    if (browser) {
        await goto(url, {
            replaceState: true,
            invalidateAll: true
        })
    } else {
        throw redirect(302, url)
    }
}
