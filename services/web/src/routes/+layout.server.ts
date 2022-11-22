import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = e => ({ user: e.locals.user })
