import { z } from "zod"

export function locale() {
    return z.enum(["ru", "en"])
}

export type Locale = z.infer<ReturnType<typeof locale>>
