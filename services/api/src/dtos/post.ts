import { JsonObject } from "type-fest"
import { Post } from "$/db/entities"
import { createUserDto } from "./user"

export function createPostDto(post: Post): JsonObject {
    return {
        id: post.id,
        author: createUserDto(post.author),
        title: post.title,
        body: post.body,
        creationDate: post.creationDate.toJSON(),
        editingDate: post.editingDate.toJSON()
    }
}
