import * as schemasRoutes from "@local/schemas/routes"

import * as api from "$lib/api"

export async function load(e) {
    const schema = schemasRoutes.posts.getPostsQuery()

    const res = await api.posts.getPosts({
        headers: e.request.headers,
        ...schema.parse(Object.fromEntries(e.url.searchParams))
    })

    return { itemsPage: res.data }
}
