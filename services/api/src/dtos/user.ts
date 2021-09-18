import { User } from "$/db/entities"

export function createUserDto(user: User) {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
    }
}
