import { z } from "@repo/utils"

import * as ban from "./ban"
import * as role from "./role"

import * as common from "$/common"

export function $username() {
    return z.string().trim().min(3).max(32).regex(/^\w+$/)
}

export type $Username = z.infer<ReturnType<typeof $username>>

export function $password() {
    return z.string().trim().min(8)
}

export type $Password = z.infer<ReturnType<typeof $password>>

export function $banned() {
    return z.boolean()
}

export type $Banned = z.infer<ReturnType<typeof $banned>>

export function $simpleUser() {
    return z.object({
        id: common.$id(),
        username: $username(),
        avatar: common.$img().nullable()
    })
}

export type $SimpleUser = z.infer<ReturnType<typeof $simpleUser>>

export function $user() {
    return z.object({
        id: common.$id(),
        email: common.$email().nullable(),
        linkedAccounts: z.object({
            email: z.boolean(),
            twitch: z.boolean()
        }),
        username: $username(),
        role: role.$role(),
        ban: ban.$ban().nullable(),
        registrationDate: common.$date(),
        avatar: common.$img().nullable()
    })
}

export type $User = z.infer<ReturnType<typeof $user>>
