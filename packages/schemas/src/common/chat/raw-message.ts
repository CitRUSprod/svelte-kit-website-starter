import { z } from "@repo/utils"

export function $rawMessage() {
    return z.object({
        text: z.string()
    })
}

export type $RawMessage = z.infer<ReturnType<typeof $rawMessage>>
