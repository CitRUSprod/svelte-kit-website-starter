import { z } from "@local/utils"

export function file() {
    return z.any()
}

export type File = z.infer<ReturnType<typeof file>>
