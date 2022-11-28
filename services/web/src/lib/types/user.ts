import type { Permission } from "$lib/enums"

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
