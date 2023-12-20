import { z } from "zod"

export function email() {
    return z.string().trim().toLowerCase().email()
}

export function username() {
    return z.string().trim().min(3).max(32)
}

export function password() {
    return z.string().trim().min(8)
}
