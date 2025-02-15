import * as constantsEnums from "@local/constants/enums"
import { z } from "@local/utils"
import * as _ from "lodash-es"

export function provider() {
    return z.nativeEnum(constantsEnums.OAuthProvider)
}

export type Provider = z.infer<ReturnType<typeof provider>>

export function provider$Kebab() {
    const providers = Object.values(constantsEnums.OAuthProvider).map(p => _.kebabCase(p))
    return z.enum(providers as [string, ...Array<string>])
}

export type Provider$Kebab = z.infer<ReturnType<typeof provider$Kebab>>
