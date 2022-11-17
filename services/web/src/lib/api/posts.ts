import { get } from "svelte/store"
import { posts } from "$lib/stores"

function wait() {
    return new Promise(r => {
        setTimeout(r, 1000)
    })
}

interface CreatePostData {
    title: string
    content: string
}

export async function createPost(data: CreatePostData) {
    await wait()
    posts.add(data.title, data.content)
    const post = get(posts).at(-1)!
    return post
}

interface EditPostData {
    id: number
    title: string
    content: string
}

export async function editPost(data: EditPostData) {
    await wait()
    posts.edit(data.id, data.title, data.content)
    const post = get(posts).find(p => p.id === data.id)!
    return post
}

interface RemovePostData {
    id: number
}

export async function removePost(data: RemovePostData) {
    await wait()
    const post = get(posts).find(p => p.id === data.id)!
    posts.remove(data.id)
    return post
}
