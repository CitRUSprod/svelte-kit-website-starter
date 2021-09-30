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

    const keys = Object.keys(params)

    for (const key of keys) {
        if (params[key] !== defaultParams[key]) {
            result[key] = params[key]
        }
    }

    return result as Partial<T>
}

export function setForCurrentPage(query: Record<string, any>) {
    const url = new URL(location.href)
    url.search = ""
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
