import type { Role } from "$lib/enums"

export interface User {
    id: number
    email: string
    username: string
    password: string
    role: Role
    registrationDate: string
}
