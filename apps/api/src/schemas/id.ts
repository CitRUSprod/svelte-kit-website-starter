import { z } from "zod"

export function id() {
    return z.coerce.number().int().min(1)
}
