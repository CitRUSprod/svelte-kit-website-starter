export function setQueryParams(query: Record<string, string | undefined>) {
    const url = new URL(location.href)
    const keys = Object.keys(query)

    for (const key of keys) {
        const value = query[key]

        if (value) {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.delete(key)
        }
    }

    history.pushState(null, "", url.toString())
}
