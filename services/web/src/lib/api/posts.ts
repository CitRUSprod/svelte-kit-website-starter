import { axios, createAxiosConfig } from "$lib/utils"

import type { ItemsPage, Post } from "$lib/types"

interface GetPostsData {
    headers?: Headers
}

export function getPosts(data: GetPostsData = {}) {
    return axios.get<ItemsPage<Post>>("/api/posts", createAxiosConfig(data.headers))
}

interface GetPostData {
    headers?: Headers
    id: number
}

export function getPost(data: GetPostData) {
    return axios.get<Post>(`/api/posts/${data.id}`, createAxiosConfig(data.headers))
}

interface CreatePostData {
    headers?: Headers
    title: string
    content: string
}

export function createPost(data: CreatePostData) {
    return axios.post<Post>(
        "/api/posts",
        {
            title: data.title,
            content: data.content
        },
        createAxiosConfig(data.headers)
    )
}

interface UpdatePostData {
    headers?: Headers
    id: number
    title?: string
    content?: string
}

export function updatePost(data: UpdatePostData) {
    return axios.patch<Post>(
        `/api/posts/${data.id}`,
        {
            title: data.title,
            content: data.content
        },
        createAxiosConfig(data.headers)
    )
}

interface DeletePostData {
    headers?: Headers
    id: number
}

export function deletePost(data: DeletePostData) {
    return axios.delete<Post>(`/api/posts/${data.id}`, createAxiosConfig(data.headers))
}
