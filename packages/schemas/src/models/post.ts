import { z } from "@repo/utils"

import * as user from "./user"

import * as common from "$/common"

export function $title() {
    return z.string().trim().min(1).max(100)
}

export type $Title = z.infer<ReturnType<typeof $title>>

export function $content() {
    return z.string().trim().min(1)
}

export type $Content = z.infer<ReturnType<typeof $content>>

export function $post() {
    return z.object({
        id: common.$id(),
        title: $title(),
        content: $content(),
        author: user.$simpleUser().nullable(),
        creationDate: common.$date(),
        editingDate: common.$date().nullable()
    })
}

export type $Post = z.infer<ReturnType<typeof $post>>
