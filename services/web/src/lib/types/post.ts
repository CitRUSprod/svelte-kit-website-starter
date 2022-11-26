export interface Post {
    id: number
    title: string
    content: string
    author: {
        id: number
        username: string
    }
    creationDate: string
    editingDate: string | null
}
