import { JsonObject } from "type-fest"
import { User, Post } from "$/db/entities"

export function user(u: User): JsonObject {
    return {
        id: u.id,
        email: u.email,
        username: u.username,
        role: u.role,
        registrationDate: u.registrationDate.toJSON()
    }
}

export function post(p: Post): JsonObject {
    return {
        id: p.id,
        author: user(p.author),
        title: p.title,
        body: p.body,
        creationDate: p.creationDate.toJSON(),
        editingDate: p.editingDate.toJSON()
    }
}
