import { z } from "@repo/utils"

import * as ban from "./ban"
import * as role from "./role"

import * as common from "$/common"

export function email() {
    return z.string().trim().toLowerCase().email()
}

export type Email = z.infer<ReturnType<typeof email>>

export function username() {
    return z.string().trim().min(3).max(32).regex(/^\w+$/)
}

export type Username = z.infer<ReturnType<typeof username>>

export function password() {
    return z.string().trim().min(8)
}

export type Password = z.infer<ReturnType<typeof password>>

export function banned() {
    return z.boolean()
}

export type Banned = z.infer<ReturnType<typeof banned>>

export function registrationDate() {
    return z.string().min(1)
}

export type RegistrationDate = z.infer<ReturnType<typeof registrationDate>>

export function avatar() {
    return z.string().min(1)
}

export type Avatar = z.infer<ReturnType<typeof avatar>>

export function user() {
    return z.object({
        id: common.id(),
        email: email().nullable(),
        linkedAccounts: z
            .object({
                email: z.boolean(),
                twitch: z.boolean()
            })
            .nullable(),
        username: username(),
        role: z.object({
            id: common.id(),
            name: role.name(),
            permissions: z.array(role.permission())
        }),
        ban: ban.ban().nullable(),
        registrationDate: registrationDate(),
        avatar: avatar().nullable()
    })
}

export type User = z.infer<ReturnType<typeof user>>
