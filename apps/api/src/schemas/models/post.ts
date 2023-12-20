import { z } from "zod"

export function title() {
    return z.string().trim().min(1).max(100)
}

export function content() {
    return z.string().trim().min(1)
}
