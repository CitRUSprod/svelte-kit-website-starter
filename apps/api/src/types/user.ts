import type { User, Role, Ban } from "$/prisma/generated/client"

export interface UserPayload {
    id: number
}

export type UserData = User & {
    role: Role
    ban: (Ban & { author: { id: number; username: string } }) | null
}
