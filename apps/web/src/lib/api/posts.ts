import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { RequestData } from "$lib/types"

export function getPosts(data: RequestData<schemasRoutes.posts.GetPostsRequest> = {}) {
    return axios.get<schemasRoutes.posts.GetPostsResponse>(
        createApiUrl(constantsRoutes.posts.getPosts),
        {
            params: {
                page: data.page,
                perPage: data.perPage,
                sort: data.sort,
                order: data.order,
                title: data.title
            },
            ...createAxiosConfig(data.headers)
        }
    )
}

export function getPost(data: RequestData<schemasRoutes.posts.GetPostRequest>) {
    return axios.get<schemasRoutes.posts.GetPostResponse>(
        createApiUrl(constantsRoutes.posts.getPost, data.id),
        createAxiosConfig(data.headers)
    )
}

export function createPost(data: RequestData<schemasRoutes.posts.CreatePostRequest>) {
    return axios.post<schemasRoutes.posts.CreatePostResponse>(
        createApiUrl(constantsRoutes.posts.createPost),
        {
            title: data.title,
            content: data.content
        },
        createAxiosConfig(data.headers)
    )
}

export function updatePost(data: RequestData<schemasRoutes.posts.UpdatePostRequest>) {
    return axios.patch<schemasRoutes.posts.UpdatePostResponse>(
        createApiUrl(constantsRoutes.posts.updatePost, data.id),
        {
            title: data.title,
            content: data.content
        },
        createAxiosConfig(data.headers)
    )
}

export function deletePost(data: RequestData<schemasRoutes.posts.DeletePostRequest>) {
    return axios.delete<schemasRoutes.posts.DeletePostResponse>(
        createApiUrl(constantsRoutes.posts.deletePost, data.id),
        createAxiosConfig(data.headers)
    )
}
