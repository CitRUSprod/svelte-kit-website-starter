import * as constantsEnums from "@repo/constants/enums"
import { z } from "@repo/utils"
import * as _ from "es-toolkit"

export function $provider() {
    return z.enum(constantsEnums.OAuthProvider)
}

export type $Provider = z.infer<ReturnType<typeof $provider>>

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
export function $provider_kebab() {
    const providers = Object.values(constantsEnums.OAuthProvider).map(p => _.kebabCase(p))
    return z.enum(providers as [string, ...Array<string>])
}

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
export type $Provider_Kebab = z.infer<ReturnType<typeof $provider_kebab>>
