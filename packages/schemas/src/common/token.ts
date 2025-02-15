import { z } from "@local/utils"

export function token() {
    return z.string().trim().length(36)
}

export type Token = z.infer<ReturnType<typeof token>>
