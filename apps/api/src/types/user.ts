import { User, Role } from "@prisma/client"

export interface UserPayload {
    id: number
}

export type UserData = User & { role: Role }
