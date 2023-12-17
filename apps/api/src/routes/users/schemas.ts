import { z } from "zod"
import * as schemas from "$/schemas"

export const getUsersQuery = z.object({
    ...schemas.pagination().shape,
    ...schemas.sorting("email", "username", "registrationDate").shape,
    email: schemas.models.user.email().optional(),
    username: schemas.models.user.username().optional()
})

export type GetUsersQuery = z.infer<typeof getUsersQuery>

export const getUserParams = z.object({
    id: schemas.id()
})

export type GetUserParams = z.infer<typeof getUserParams>

export const assignRoleToUserParams = z.object({
    id: schemas.id(),
    roleId: schemas.id()
})

export type AssignRoleToUserParams = z.infer<typeof assignRoleToUserParams>

export const banUserParams = z.object({
    id: schemas.id()
})

export type BanUserParams = z.infer<typeof banUserParams>

export const unbanUserParams = z.object({
    id: schemas.id()
})

export type UnbanUserParams = z.infer<typeof unbanUserParams>
