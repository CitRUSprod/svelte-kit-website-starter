import { z } from "@repo/utils"

export function $date() {
    return z.string().min(1)
}

export type $Date = z.infer<ReturnType<typeof $date>>
