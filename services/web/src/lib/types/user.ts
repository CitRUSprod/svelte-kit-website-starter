export enum Permission {
    DeleteOtherUserPost = "DeleteOtherUserPost",
    BanUser = "BanUser",
    CreateRole = "CreateRole",
    GetOtherUserEmail = "GetOtherUserEmail",
    AssignRole = "AssignRole"
}

export interface Role {
    id: number
    name: string
    permissions: Array<Permission>
}

export interface User {
    id: number
    email?: string
    username: string
    role: Role
    confirmedEmail: boolean
    banned: boolean
    registrationDate: string
    avatar: string | null
}
