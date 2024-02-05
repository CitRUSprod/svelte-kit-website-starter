import { z } from "zod"
import * as common from "$/common"
import * as user from "./user"

export function title() {
    return z.string().trim().min(1).max(100)
}

export type Title = z.infer<ReturnType<typeof title>>

export function content() {
    return z.string().trim().min(1)
}

export type Content = z.infer<ReturnType<typeof content>>

export function creationDate() {
    return z.string().min(1)
}

export type CreationDate = z.infer<ReturnType<typeof creationDate>>

export function editingDate() {
    return z.string().min(1)
}

export type EditingDate = z.infer<ReturnType<typeof editingDate>>

export function post() {
    return z.object({
        id: common.id(),
        title: title(),
        content: content(),
        author: z.object({
            id: common.id(),
            username: user.username()
        }),
        creationDate: creationDate(),
        editingDate: editingDate().nullable()
    })
}

export type Post = z.infer<ReturnType<typeof post>>
