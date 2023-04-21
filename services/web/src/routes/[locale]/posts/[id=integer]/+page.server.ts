import { redirect } from "@sveltejs/kit"
import * as api from "$lib/api"

export async function load(e) {
    try {
        const res = await api.posts.getPost({
            headers: e.request.headers,
            id: parseInt(e.params.id)
        })
        return { post: res.data }
    } catch {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect(302, `/${e.params.locale as string}/posts`)
    }
}
