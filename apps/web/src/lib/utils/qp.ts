import { z } from "@local/utils"
import { queryParameters } from "sveltekit-search-params"

export function param<T extends z.ZodType>(schema: T) {
    const defaultValue: z.infer<T> = schema.parse(undefined)

    return {
        encode(v: z.infer<T>) {
            return v === defaultValue ? undefined : String(v)
        },
        decode(v: string | null): z.infer<T> {
            return schema.parse(v)
        },
        defaultValue
    }
}

export function params<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>
): { [K in keyof T]: ReturnType<typeof param<T[K]>> } {
    return Object.fromEntries(
        Object.entries(schema.shape).map(([key, sch]) => [key, param(sch)])
    ) as { [K in keyof T]: ReturnType<typeof param<T[K]>> }
}

export function createStore<T extends Record<string, ReturnType<typeof param>>>(options: T) {
    return queryParameters(options, {
        showDefaults: false,
        sort: true
    })
}
