import { z } from "@repo/utils"

export function $url() {
    return z.url().trim()
}

export type $Url = z.infer<ReturnType<typeof $url>>
