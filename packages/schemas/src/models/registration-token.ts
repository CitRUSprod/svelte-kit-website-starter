import { z } from "zod"

import * as user from "./user"

export function email() {
    return user.email()
}

export type Email = z.infer<ReturnType<typeof email>>

export function username() {
    return user.username()
}

export type Username = z.infer<ReturnType<typeof username>>

export function password() {
    return user.password()
}

export type Password = z.infer<ReturnType<typeof password>>
