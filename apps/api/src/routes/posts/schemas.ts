import { z } from "zod"
import * as schemas from "$/schemas"

export const getPostsQuery = z.object({
    ...schemas.pagination().shape,
    ...schemas.sorting("title", "creationDate").shape,
    title: schemas.models.post.title().optional()
})

export type GetPostsQuery = z.infer<typeof getPostsQuery>

export const createPostBody = z.object({
    title: schemas.models.post.title(),
    content: schemas.models.post.content()
})

export type CreatePostBody = z.infer<typeof createPostBody>

export const getPostParams = z.object({
    id: schemas.id()
})

export type GetPostParams = z.infer<typeof getPostParams>

export const updatePostParams = z.object({
    id: schemas.id()
})

export type UpdatePostParams = z.infer<typeof updatePostParams>

export const updatePostBody = z.object({
    title: schemas.models.post.title().optional(),
    content: schemas.models.post.content().optional()
})

export type UpdatePostBody = z.infer<typeof updatePostBody>

export const deletePostParams = z.object({
    id: schemas.id()
})

export type DeletePostParams = z.infer<typeof deletePostParams>
