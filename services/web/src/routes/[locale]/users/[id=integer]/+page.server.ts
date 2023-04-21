import * as api from "$lib/api"

export async function load(e) {
    const res = await api.users.getUser({
        headers: e.request.headers,
        id: parseInt(e.params.id)
    })
    return { user: res.data }
}
