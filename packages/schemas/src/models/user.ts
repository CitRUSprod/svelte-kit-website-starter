import { z } from "zod"

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
