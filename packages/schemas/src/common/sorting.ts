import { z } from "@repo/utils"

export function sorting<T extends string>(field: T, ...fields: Array<T>) {
    return z.object({
        sort: z.enum([field, ...fields]).default(field as any),
        order: z.enum(["asc", "desc"]).default("asc")
    })
}

export type Sorting = z.infer<ReturnType<typeof sorting>>
