import type { User } from "./user"

export interface Session {
    user: Readonly<User> | null
}
