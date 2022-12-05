import { qp } from "$lib/utils"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

interface QueryParams {
    page: number
    perPage: number
    sort: string
    order: string
    title: string
}

const defaultQuery: QueryParams = {
    page: 1,
    perPage: 10,
    sort: "creationDate",
    order: "asc",
    title: ""
}

export const load: PageServerLoad = async e => {
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
