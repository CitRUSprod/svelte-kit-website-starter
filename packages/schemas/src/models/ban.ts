import { z } from "zod"
import * as common from "$/common"
import * as user from "./user"

export function reason() {
    return z.string().trim().min(1)
}

export type Reason = z.infer<ReturnType<typeof reason>>

export function date() {
    return z.string().min(1)
}

export type Date$ = z.infer<ReturnType<typeof date>>

export function ban() {
    return z.object({
        id: common.id(),
        author: z.object({
            id: common.id(),
            username: user.username()
        }),
        reason: reason(),
        date: date()
    })
}

export type Ban = z.infer<ReturnType<typeof ban>>
