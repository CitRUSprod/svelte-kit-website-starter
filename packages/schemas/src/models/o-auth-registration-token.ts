import * as constantsEnums from "@local/constants/enums"
import * as _ from "lodash-es"
import { z } from "zod"

export function provider() {
    return z.nativeEnum(constantsEnums.OAuthProvider)
}

export type Provider = z.infer<ReturnType<typeof provider>>

export function provider$Kebab() {
    const providers = Object.values(constantsEnums.OAuthProvider).map(p => _.kebabCase(p))
    return z.enum(providers as [string, ...Array<string>])
}

export type Provider$Kebab = z.infer<ReturnType<typeof provider$Kebab>>
