import { z } from "@repo/utils"

export function $id() {
    return z.coerce.number().int().positive()
}

export type $Id = z.infer<ReturnType<typeof $id>>
