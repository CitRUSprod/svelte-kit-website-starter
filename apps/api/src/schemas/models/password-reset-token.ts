import { z } from "zod"

export function token() {
    return z.string().trim().length(36)
}
