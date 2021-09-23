import { JsonObject } from "type-fest"
import { Post } from "$/db/entities"
import { createUserDto } from "./user"

export function createPostDto(post: Post): JsonObject {
    return {
        id: post.id,
        author: createUserDto(post.author),
        title: post.title,
        body: post.body,
        createdAt: post.createdAt.toJSON(),
        editedAt: post.editedAt.toJSON()
    }
}
