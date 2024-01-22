import { z } from "zod"

export function token() {
    return z.string().trim().min(1)
}

export type Token = z.infer<ReturnType<typeof token>>
