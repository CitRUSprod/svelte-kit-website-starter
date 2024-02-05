import { z } from "zod"
import * as common from "$/common"
import * as role from "./role"

export function email() {
    return z.string().trim().toLowerCase().email()
}

export type Email = z.infer<ReturnType<typeof email>>

export function username() {
    return z.string().trim().min(3).max(32)
}

export type Username = z.infer<ReturnType<typeof username>>

export function password() {
    return z.string().trim().min(8)
}

export type Password = z.infer<ReturnType<typeof password>>

export function confirmedEmail() {
    return z.boolean()
}

export type ConfirmedEmail = z.infer<ReturnType<typeof confirmedEmail>>

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
        username: username(),
        role: z.object({
            id: common.id(),
            name: role.name(),
            permissions: z.array(role.permission())
        }),
        confirmedEmail: confirmedEmail().nullable(),
        banned: banned(),
        registrationDate: registrationDate(),
        avatar: avatar().nullable()
    })
}

export type User = z.infer<ReturnType<typeof user>>
