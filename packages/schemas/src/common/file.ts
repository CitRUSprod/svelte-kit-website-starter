import { z } from "zod"

export function file() {
    return z.object({
        file: z.unknown()
    })
}

export type File = z.infer<ReturnType<typeof file>>
