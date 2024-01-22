import { Permission } from "@local/constants/enums"
import { z } from "zod"

export function name() {
    return z.string().trim().toLowerCase().min(1)
}

export type Name = z.infer<ReturnType<typeof name>>

export function permissions() {
    return z.array(z.nativeEnum(Permission))
}

export type Permissions = z.infer<ReturnType<typeof permissions>>
