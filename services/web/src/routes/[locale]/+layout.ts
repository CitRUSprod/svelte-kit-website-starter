export async function load({ parent: p }) {
    const { route } = await p()
    return { route }
}
