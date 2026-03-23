import { z } from "@repo/utils"

export function $order() {
    return z.enum(["asc", "desc"]).default("asc")
}

export type $Order = z.infer<ReturnType<typeof $order>>
