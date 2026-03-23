import { z } from "@repo/utils"

export function $jwt() {
    return z.jwt()
}

export type $Jwt = z.infer<ReturnType<typeof $jwt>>
