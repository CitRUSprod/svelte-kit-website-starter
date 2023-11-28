import { axios, createAxiosConfig } from "$lib/utils"

import type { ItemsPage, Post } from "$lib/types"

interface GetPostsData {
    headers?: Headers
    page?: number
    perPage?: number
    sort?: string
    order?: string
    title?: string
}

export function getPosts(data: GetPostsData = {}) {
    return axios.get<ItemsPage<Post>>("/api/posts", {
        params: {
            page: data.page,
            perPage: data.perPage,
            sort: data.sort,
            order: data.order,
            title: data.title
        },
        ...createAxiosConfig(data.headers)
    })
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
