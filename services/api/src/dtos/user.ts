import { JsonObject } from "type-fest"
import { User } from "$/db/entities"

export function createUserDto(user: User): JsonObject {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt.toJSON()
    }
}
