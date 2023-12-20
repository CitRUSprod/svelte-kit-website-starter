import { z } from "zod"

export function file() {
    return z.object({
        file: z.unknown()
    })
}
