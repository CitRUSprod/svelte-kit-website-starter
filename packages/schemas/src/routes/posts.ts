import { z } from "zod"

import * as common from "$/common"
import * as models from "$/models"

// GetPosts

export function getPostsQuery() {
    return z.object({
        ...common.pagination().shape,
        ...common.sorting("creationDate", "title").shape,
        title: models.post.title().optional()
    })
}

export type GetPostsQuery = z.infer<ReturnType<typeof getPostsQuery>>

export function getPostsRequest() {
    return z.object({
        ...getPostsQuery().partial().shape
    })
}

export type GetPostsRequest = z.infer<ReturnType<typeof getPostsRequest>>

export function getPostsResponse() {
    return z.object({
        ...common.itemsPage(models.post.post()).shape
    })
}

export type GetPostsResponse = z.infer<ReturnType<typeof getPostsResponse>>

// CreatePost

export function createPostBody() {
    return z.object({
        title: models.post.title(),
        content: models.post.content()
    })
}

export type CreatePostBody = z.infer<ReturnType<typeof createPostBody>>

export function createPostRequest() {
    return z.object({
        ...createPostBody().shape
    })
}

export type CreatePostRequest = z.infer<ReturnType<typeof createPostRequest>>

export function createPostResponse() {
    return z.object({
        ...models.post.post().shape
    })
}

export type CreatePostResponse = z.infer<ReturnType<typeof createPostResponse>>

// GetPost

export function getPostParams() {
    return z.object({
        id: common.id()
    })
}

export type GetPostParams = z.infer<ReturnType<typeof getPostParams>>

export function getPostRequest() {
    return z.object({
        ...getPostParams().shape
    })
}

export type GetPostRequest = z.infer<ReturnType<typeof getPostRequest>>

export function getPostResponse() {
    return z.object({
        ...models.post.post().shape
    })
}

export type GetPostResponse = z.infer<ReturnType<typeof getPostResponse>>

// UpdatePost

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

export function updatePostRequest() {
    return z.object({
        ...updatePostParams().shape,
        ...updatePostBody().shape
    })
}

export type UpdatePostRequest = z.infer<ReturnType<typeof updatePostRequest>>

export function updatePostResponse() {
    return z.object({
        ...models.post.post().shape
    })
}

export type UpdatePostResponse = z.infer<ReturnType<typeof updatePostResponse>>

// DeletePost

export function deletePostParams() {
    return z.object({
        id: common.id()
    })
}

export type DeletePostParams = z.infer<ReturnType<typeof deletePostParams>>

export function deletePostRequest() {
    return z.object({
        ...deletePostParams().shape
    })
}

export type DeletePostRequest = z.infer<ReturnType<typeof deletePostRequest>>

export function deletePostResponse() {
    return z.object({
        ...models.post.post().shape
    })
}

export type DeletePostResponse = z.infer<ReturnType<typeof deletePostResponse>>
