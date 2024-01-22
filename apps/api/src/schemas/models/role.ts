import { z } from "zod"
import * as constantsEnums from "@local/constants/enums"

export function name() {
    return z.string().trim().toLowerCase().min(1)
}

export function permissions() {
    return z.array(z.nativeEnum(constantsEnums.Permission))
}
