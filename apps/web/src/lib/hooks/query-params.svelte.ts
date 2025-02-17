import { z } from "@local/utils"
import * as _ from "lodash-es"

import { pushState } from "$app/navigation"
import { page } from "$app/state"

type Schema = Record<string, z.ZodSchema>

const debouncedPushState = _.debounce(pushState, 200)

export function useQueryParams<T extends Schema>(schema: T) {
    type Params = { [K in keyof T]: z.infer<T[K]> }

    const defaultParams = Object.fromEntries(
        Object.entries(schema).map(([key, sch]) => [key, sch.parse(undefined)])
    ) as Params

    let search = $state(page.url.searchParams.toString())

    const rawParams = $derived(Object.fromEntries(new URLSearchParams(search)))

    const parsedParams = $derived.by(() => {
        const entries = Object.entries(schema).map(([key, sch]) => [key, sch.parse(rawParams[key])])
        return Object.fromEntries(entries) as Params
    })

    const params = new Proxy({} as Params, {
        get(target, prop: string) {
            return parsedParams[prop]
        },
        set(target, prop: string, value) {
            const searchParams = new URLSearchParams(search)

            if (value === defaultParams[prop]) {
                searchParams.delete(prop)
            } else {
                searchParams.set(prop, String(value))
            }

            const sortedParams = new URLSearchParams(
                [...searchParams.entries()].sort((a, b) => (a[0] > b[0] ? 1 : -1))
            )
            search = sortedParams.toString()
            debouncedPushState(`?${search}`, page.state)

            return true
        },
        ownKeys() {
            return Object.keys(parsedParams)
        },
        getOwnPropertyDescriptor(target, prop: string) {
            return {
                enumerable: true,
                configurable: true,
                value: parsedParams[prop]
            }
        }
    })

    return params
}
