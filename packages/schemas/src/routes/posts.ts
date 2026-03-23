import { z } from "@repo/utils"

import * as common from "$/common"
import * as models from "$/models"

// GetPosts

export function $getPostsQuery() {
    return z.object({
        page: common.pagination.$page().catch(1),
        perPage: common.pagination.$perPage().catch(10),
        sort: common.sorting.$sort("creationDate", "title").catch("creationDate"),
        order: common.sorting.$order().catch("asc"),
        title: models.post.$title().optional().catch(undefined)
    })
}

export type $GetPostsQuery = z.infer<ReturnType<typeof $getPostsQuery>>

export function $getPostsRequest() {
    return z.object({
        ...$getPostsQuery().partial().shape
    })
}

export type $GetPostsRequest = z.infer<ReturnType<typeof $getPostsRequest>>

export function $getPostsResponse() {
    return common.pagination.$itemsPage(models.post.$post())
}

export type $GetPostsResponse = z.infer<ReturnType<typeof $getPostsResponse>>

// CreatePost

export function $createPostBody() {
    return z.object({
        title: models.post.$title(),
        content: models.post.$content()
    })
}

export type $CreatePostBody = z.infer<ReturnType<typeof $createPostBody>>

export function $createPostRequest() {
    return z.object({
        ...$createPostBody().shape
    })
}

export type $CreatePostRequest = z.infer<ReturnType<typeof $createPostRequest>>

export function $createPostResponse() {
    return models.post.$post()
}

export type $CreatePostResponse = z.infer<ReturnType<typeof $createPostResponse>>

// GetPost

export function $getPostParams() {
    return z.object({
        id: common.$id()
    })
}

export type $GetPostParams = z.infer<ReturnType<typeof $getPostParams>>

export function $getPostRequest() {
    return z.object({
        ...$getPostParams().shape
    })
}

export type $GetPostRequest = z.infer<ReturnType<typeof $getPostRequest>>

export function $getPostResponse() {
    return models.post.$post()
}

export type $GetPostResponse = z.infer<ReturnType<typeof $getPostResponse>>

// UpdatePost

export function $updatePostParams() {
    return z.object({
        id: common.$id()
    })
}

export type $UpdatePostParams = z.infer<ReturnType<typeof $updatePostParams>>

export function $updatePostBody() {
    return z.object({
        title: models.post.$title().optional(),
        content: models.post.$content().optional()
    })
}

export type $UpdatePostBody = z.infer<ReturnType<typeof $updatePostBody>>

export function $updatePostRequest() {
    return z.object({
        ...$updatePostParams().shape,
        ...$updatePostBody().shape
    })
}

export type $UpdatePostRequest = z.infer<ReturnType<typeof $updatePostRequest>>

export function $updatePostResponse() {
    return models.post.$post()
}

export type $UpdatePostResponse = z.infer<ReturnType<typeof $updatePostResponse>>

// DeletePost

export function $deletePostParams() {
    return z.object({
        id: common.$id()
    })
}

export type $DeletePostParams = z.infer<ReturnType<typeof $deletePostParams>>

export function $deletePostRequest() {
    return z.object({
        ...$deletePostParams().shape
    })
}

export type $DeletePostRequest = z.infer<ReturnType<typeof $deletePostRequest>>

export function $deletePostResponse() {
    return models.post.$post()
}

export type $DeletePostResponse = z.infer<ReturnType<typeof $deletePostResponse>>
