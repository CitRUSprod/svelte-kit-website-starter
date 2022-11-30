import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = e => ({ token: e.params.token })
