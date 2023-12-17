import { z } from "zod"

export function pagination() {
    return z.object({
        page: z.coerce.number().int().min(1).default(1),
        perPage: z.coerce.number().int().min(1).max(100).default(10)
    })
}
