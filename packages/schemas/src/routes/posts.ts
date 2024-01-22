import { z } from "zod"
import * as common from "$/common"
import * as models from "$/models"

export function getPostsQuery() {
    return z.object({
        ...common.pagination().shape,
        ...common.sorting("title", "creationDate").shape,
        title: models.post.title().optional()
    })
}

export type GetPostsQuery = z.infer<ReturnType<typeof getPostsQuery>>

export function createPostBody() {
    return z.object({
        title: models.post.title(),
        content: models.post.content()
    })
}

export type CreatePostBody = z.infer<ReturnType<typeof createPostBody>>

export function getPostParams() {
    return z.object({
        id: common.id()
    })
}

export type GetPostParams = z.infer<ReturnType<typeof getPostParams>>

export function updatePostParams() {
    return z.object({
        id: common.id()
    })
}

export type UpdatePostParams = z.infer<ReturnType<typeof updatePostParams>>

export function updatePostBody() {
    return z.object({
        title: models.post.title().optional(),
        content: models.post.content().optional()
    })
}

export type UpdatePostBody = z.infer<ReturnType<typeof updatePostBody>>

export function deletePostParams() {
    return z.object({
        id: common.id()
    })
}

export type DeletePostParams = z.infer<ReturnType<typeof deletePostParams>>
