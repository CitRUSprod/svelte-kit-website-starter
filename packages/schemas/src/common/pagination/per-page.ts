import { z } from "@repo/utils"

export function $perPage() {
    return z.coerce.number().int().min(1).max(100).default(10)
}

export type $PerPage = z.infer<ReturnType<typeof $perPage>>
