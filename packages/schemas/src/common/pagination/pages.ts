import { z } from "@repo/utils"

export function $pages() {
    return z.coerce.number().int().min(0)
}

export type $Pages = z.infer<ReturnType<typeof $pages>>
