export const base = "/users"

export const getUsers = base
export const getUser = `${base}/:id`
export const assignRoleToUser = `${base}/:id/role/:roleId`
export const banUser = `${base}/:id/ban`
export const unbanUser = `${base}/:id/unban`
