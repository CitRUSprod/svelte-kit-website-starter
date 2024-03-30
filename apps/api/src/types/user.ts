import { User, Role, Ban } from "@prisma/client"

export interface UserPayload {
    id: number
}

export type UserData = User & {
    role: Role
    ban: (Ban & { author: { id: number; username: string } }) | null
}
