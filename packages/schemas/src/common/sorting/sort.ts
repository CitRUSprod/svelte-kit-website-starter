import { z } from "@repo/utils"

export function $sort<T extends string>(field: T, ...fields: Array<T>) {
    return z.enum([field, ...fields]).default(field as any)
}

export type $Sort = z.infer<ReturnType<typeof $sort>>
