import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

// eslint-disable-next-line @typescript-eslint/consistent-return
export async function load(e) {
    try {
        const res = await api.posts.getPost({
            headers: e.request.headers,
            id: parseInt(e.params.id)
        })
        return { post: res.data }
    } catch {
        redirect(302, `/${e.params.locale as string}/posts`)
    }
}
