import * as schemasRoutes from "@local/schemas/routes"

import * as api from "$lib/api"
import { qp } from "$lib/utils"

const defaultQuery: schemasRoutes.posts.GetPostsQuery = {
    page: 1,
    perPage: 10,
    sort: "creationDate",
    order: "asc",
    title: ""
}

export async function load(e) {
    const query = qp.get(
        e.url.searchParams,
        defaultQuery,
        ["sort", "order", "title"],
        ["page", "perPage"]
    )
    const res = await api.posts.getPosts({
        headers: e.request.headers,
        ...qp.removeDefault(query, defaultQuery)
    })
    return { query, defaultQuery, itemsPage: res.data }
}
