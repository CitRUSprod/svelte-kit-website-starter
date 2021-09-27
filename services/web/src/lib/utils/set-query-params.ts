export function setQueryParams(query: Record<string, any>) {
    const url = new URL(location.href)
    const keys = Object.keys(query)

    for (const key of keys) {
        if (query[key]) {
            url.searchParams.set(key, query[key])
        } else {
            url.searchParams.delete(key)
        }
    }

    history.pushState(null, "", url.toString())
}
