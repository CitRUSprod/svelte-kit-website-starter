import { z } from "@repo/utils"

export function $email() {
    return z.email().trim().toLowerCase()
}

export type $Email = z.infer<ReturnType<typeof $email>>
