import { z } from "@repo/utils"

export function $token() {
    return z.uuidv4()
}

export type $Token = z.infer<ReturnType<typeof $token>>
