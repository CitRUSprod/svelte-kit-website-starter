import { z } from "@repo/utils"

import * as user from "./user"

import * as common from "$/common"

export function $reason() {
    return z.string().trim().min(1)
}

export type $Reason = z.infer<ReturnType<typeof $reason>>

export function $ban() {
    return z.object({
        id: common.$id(),
        author: user.$simpleUser(),
        reason: $reason(),
        date: common.$date()
    })
}

export type $Ban = z.infer<ReturnType<typeof $ban>>
