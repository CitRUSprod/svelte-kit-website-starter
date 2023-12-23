import * as enums from "$/enums"
import { z } from "zod"

export function name() {
    return z.string().trim().toLowerCase().min(1)
}

export function permissions() {
    return z.array(z.nativeEnum(enums.Permission))
}
