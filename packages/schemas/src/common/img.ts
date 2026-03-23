import { z } from "@repo/utils"

export function $img() {
    return z.string().trim().min(1)
}

export type $Img = z.infer<ReturnType<typeof $img>>
