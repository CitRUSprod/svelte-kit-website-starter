import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ parent: p }) => {
    const { route } = await p()
    return { route }
}
