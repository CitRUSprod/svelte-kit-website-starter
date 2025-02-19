import { z } from "@repo/utils"

export function locale() {
    return z.enum(["ru", "en"])
}

export type Locale = z.infer<ReturnType<typeof locale>>
