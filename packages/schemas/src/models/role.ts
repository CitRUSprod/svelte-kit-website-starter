import * as constantsEnums from "@repo/constants/enums"
import { z } from "@repo/utils"

import * as common from "$/common"

export function $name() {
    return common.$localization(z.string().min(1))
}

export type $Name = z.infer<ReturnType<typeof $name>>

export function $permission() {
    return z.enum(constantsEnums.Permission)
}

export type $Permission = z.infer<ReturnType<typeof $permission>>

export function $protected() {
    return z.boolean()
}

export type $Protected = z.infer<ReturnType<typeof $protected>>

export function $role() {
    return z.object({
        id: common.$id(),
        name: $name(),
        permissions: z.array($permission()),
        protected: $protected()
    })
}
