import type { User } from "./user"

export interface Post {
    id: number
    author: User
    title: string
    body: string
    creationDate: string
    editingDate: string
}
