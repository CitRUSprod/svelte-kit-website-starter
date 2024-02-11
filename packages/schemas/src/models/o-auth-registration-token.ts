// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { z } from "zod"
import * as constantsEnums from "@local/constants/enums"

export function token() {
    return z.string().trim().length(36)
}

export type Token = z.infer<ReturnType<typeof token>>

export function provider() {
    return z.nativeEnum(constantsEnums.OAuthProvider)
}

export type Provider = z.infer<ReturnType<typeof provider>>

export function provider$Kebab() {
    const providers = Object.values(constantsEnums.OAuthProvider).map(p => _.kebabCase(p))
    return z.enum(providers as [string, ...Array<string>])
}

export type Provider$Kebab = z.infer<ReturnType<typeof provider$Kebab>>
