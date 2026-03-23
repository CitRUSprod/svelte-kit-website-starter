import { z } from "@repo/utils"

export function $totalItems() {
    return z.coerce.number().int().min(0)
}

export type $TotalItems = z.infer<ReturnType<typeof $totalItems>>
