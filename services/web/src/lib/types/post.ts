import type { User } from "./user"

export interface Post {
    id: number
    author: User
    title: string
    body: string
    createdAt: string
    editedAt: string
}
