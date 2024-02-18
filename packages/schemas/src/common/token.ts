import { z } from "zod"

export function token() {
    return z.string().trim().length(36)
}

export type Token = z.infer<ReturnType<typeof token>>
