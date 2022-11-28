import { qp } from "$lib/utils"
import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

interface QueryParams {
    page: number
    title: string
}

const defaultQuery: QueryParams = {
    page: 1,
    title: ""
}

export const load: PageServerLoad = async e => {
    const query = qp.get(e.url.searchParams, defaultQuery, ["title"], ["page"])
    const res = await api.posts.getPosts({
        headers: e.request.headers,
        ...qp.removeDefault(query, defaultQuery)
    })
    return { query, defaultQuery, itemsPage: res.data }
}
