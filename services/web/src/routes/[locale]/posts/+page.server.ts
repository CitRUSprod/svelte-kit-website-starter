import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    const res = await api.posts.getPosts({
        headers: e.request.headers
    })
    return { itemsPage: res.data }
}
