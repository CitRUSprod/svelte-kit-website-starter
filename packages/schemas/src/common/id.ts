import { z } from "@repo/utils"

export function id() {
    return z.coerce.number().int().min(1)
}

export type Id = z.infer<ReturnType<typeof id>>
