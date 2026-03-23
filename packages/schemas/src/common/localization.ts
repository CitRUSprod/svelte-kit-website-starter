import { z } from "@repo/utils"
import type { IterableElement } from "type-fest"

import { $locale } from "./locale"

export function $localization(schema: z.ZodString) {
    const locales = Object.values($locale().options)

    const obj: Record<string, z.ZodString> = {}

    for (const locale of locales) {
        obj[locale] = schema
    }

    return z.object(obj as Record<IterableElement<typeof locales>, z.ZodString>)
}

export type $Localization = z.infer<ReturnType<typeof $localization>>
