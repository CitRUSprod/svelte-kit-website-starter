import { User } from "$/db/entities"
import { Role } from "$/enums"

export function hasAccess(user: User, allowedRoles: Role | Array<Role>) {
    if (Array.isArray(allowedRoles)) {
        return allowedRoles.includes(user.role)
    } else {
        return allowedRoles === user.role
    }
}
