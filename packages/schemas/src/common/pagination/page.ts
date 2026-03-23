import { z } from "@repo/utils"

export function $page() {
    return z.coerce.number().int().positive().default(1)
}

export type $Page = z.infer<ReturnType<typeof $page>>
