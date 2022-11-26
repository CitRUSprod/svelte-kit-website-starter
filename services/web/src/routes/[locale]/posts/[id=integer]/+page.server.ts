import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    try {
        const res = await api.posts.getPost({
            headers: e.request.headers,
            id: parseInt(e.params.id)
        })
        return { post: res.data }
    } catch {
        throw redirect(302, `/${e.params.locale}/posts`)
    }
}
