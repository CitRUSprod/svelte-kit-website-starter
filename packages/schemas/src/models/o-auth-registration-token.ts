import * as constantsEnums from "@repo/constants/enums"
import { z } from "@repo/utils"
import * as _ from "es-toolkit"

export function provider() {
    return z.enum(constantsEnums.OAuthProvider)
}

export type Provider = z.infer<ReturnType<typeof provider>>

export function provider$Kebab() {
    const providers = Object.values(constantsEnums.OAuthProvider).map(p => _.kebabCase(p))
    return z.enum(providers as [string, ...Array<string>])
}

export type Provider$Kebab = z.infer<ReturnType<typeof provider$Kebab>>
