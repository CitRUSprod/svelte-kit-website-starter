import { z } from "@repo/utils"

export function $uuid() {
    return z.uuidv4()
}

export type $Uuid = z.infer<ReturnType<typeof $uuid>>
