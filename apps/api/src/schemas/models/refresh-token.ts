import { z } from "zod"

export function token() {
    return z.string().trim().min(1)
}
