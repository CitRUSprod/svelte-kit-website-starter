import { z } from "zod"
import * as constantsEnums from "@local/constants/enums"
import * as common from "$/common"

import type { IterableElement } from "type-fest"

export function name() {
    const locales = Object.values(common.locale().Values)

    const obj: Record<string, z.ZodString> = {}

    for (const locale of locales) {
        obj[locale] = z.string().min(1)
    }

    return z.object(obj as Record<IterableElement<typeof locales>, z.ZodString>)
}

export type Name = z.infer<ReturnType<typeof name>>

export function permission() {
    return z.nativeEnum(constantsEnums.Permission)
}

export type Permission = z.infer<ReturnType<typeof permission>>

export function protected$() {
    return z.boolean()
}

export type Protected = z.infer<ReturnType<typeof protected$>>

export function role() {
    return z.object({
        id: common.id(),
        name: name(),
        permissions: z.array(permission()),
        protected: protected$()
    })
}

export type Role = z.infer<ReturnType<typeof role>>
