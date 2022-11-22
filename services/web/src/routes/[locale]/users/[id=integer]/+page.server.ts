import * as api from "$lib/api"

import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async e => {
    const res = await api.users.getUser({
        headers: e.request.headers,
        id: parseInt(e.params.id)
    })
    return { user: res.data }
}
