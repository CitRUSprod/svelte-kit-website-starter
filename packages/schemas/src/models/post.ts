import { z } from "zod"

export function title() {
    return z.string().trim().min(1).max(100)
}

export type Title = z.infer<ReturnType<typeof title>>

export function content() {
    return z.string().trim().min(1)
}

export type Content = z.infer<ReturnType<typeof content>>
