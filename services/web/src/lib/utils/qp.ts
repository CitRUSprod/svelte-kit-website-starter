export function get<T extends Record<string, any>>(
    params: URLSearchParams,
    defaultParams: T,
    strings: Array<string>,
    numbers: Array<string> = []
) {
    const result: Record<string, any> = {}

    for (const str of strings) {
        result[str] = params.get(str) ?? defaultParams[str]
    }

    for (const num of numbers) {
        const n = params.get(num)
        result[num] = n === null ? defaultParams[num] : parseFloat(n)
    }

    return result as T
}

export function removeDefault<T extends Record<string, any>>(params: T, defaultParams: T) {
    const result: Record<string, any> = {}

    for (const key of Object.keys(params)) {
        if (params[key] !== defaultParams[key]) {
            result[key] = params[key]
        }
    }

    return result as Partial<T>
}

export function setForCurrentPage(query: Record<string, any>) {
    const url = new URL(location.href)
    url.search = ""

    for (const key of Object.keys(query)) {
        const value = query[key]

        if (value) {
            url.searchParams.set(key, value.toString())
        } else {
            url.searchParams.delete(key)
        }
    }

    history.pushState(null, "", url.toString())
}
