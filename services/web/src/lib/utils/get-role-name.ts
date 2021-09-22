import { Role } from "$lib/enums"

const roles = {
    [Role.User]: "User",
    [Role.Admin]: "Admin"
}

export function getRoleName(role: Role) {
    return roles[role]
}
