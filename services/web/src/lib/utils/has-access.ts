import type { Role } from "$lib/enums"
import type { User } from "$lib/types"

export function hasAccess(user: User | null, allowedRoles: Role | Array<Role>) {
    if (!user) {
        return false
    } else if (Array.isArray(allowedRoles)) {
        return allowedRoles.includes(user.role)
    } else {
        return allowedRoles === user.role
    }
}
