import { queryParameters } from "sveltekit-search-params"

export function boolean(defaultValue: boolean) {
    return {
        encode(v: boolean) {
            return v === defaultValue ? undefined : String(v)
        },
        decode(v: string | null) {
            return v !== null && v !== "false"
        },
        defaultValue
    }
}

export function number(defaultValue: number) {
    return {
        encode(v: number) {
            return v === defaultValue ? undefined : String(v)
        },
        decode(v: string | null) {
            return v ? Number(v) : null
        },
        defaultValue
    }
}

export function string(defaultValue: string) {
    return {
        encode(v: string) {
            return v === defaultValue ? undefined : v
        },
        decode(v: string | null) {
            return v
        },
        defaultValue
    }
}

export function createStore<
    T extends Record<
        string,
        ReturnType<typeof boolean> | ReturnType<typeof number> | ReturnType<typeof string>
    >
>(options: T) {
    return queryParameters(options, {
        showDefaults: false,
        sort: true
    })
}
