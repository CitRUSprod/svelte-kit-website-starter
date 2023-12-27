import { z } from "zod"
import * as schemas from "$/schemas"

export const basePath = "/posts"

export const getPostsPath = "/"

export function getPostsQuerySchema() {
    return z.object({
        ...schemas.pagination().shape,
        ...schemas.sorting("title", "creationDate").shape,
        title: schemas.models.post.title().optional()
    })
}

export type GetPostsQuery = z.infer<ReturnType<typeof getPostsQuerySchema>>

export const createPostPath = "/"

export function createPostBodySchema() {
    return z.object({
        title: schemas.models.post.title(),
        content: schemas.models.post.content()
    })
}

export type CreatePostBody = z.infer<ReturnType<typeof createPostBodySchema>>

export const getPostPath = "/:id"

export function getPostParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type GetPostParams = z.infer<ReturnType<typeof getPostParamsSchema>>

export const updatePostPath = "/:id"

export function updatePostParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type UpdatePostParams = z.infer<ReturnType<typeof updatePostParamsSchema>>

export function updatePostBodySchema() {
    return z.object({
        title: schemas.models.post.title().optional(),
        content: schemas.models.post.content().optional()
    })
}

export type UpdatePostBody = z.infer<ReturnType<typeof updatePostBodySchema>>

export const deletePostPath = "/:id"

export function deletePostParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type DeletePostParams = z.infer<ReturnType<typeof deletePostParamsSchema>>
