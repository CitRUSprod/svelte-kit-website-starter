import { z } from "zod"

export function file() {
    return z.any()
}

export type File = z.infer<ReturnType<typeof file>>
