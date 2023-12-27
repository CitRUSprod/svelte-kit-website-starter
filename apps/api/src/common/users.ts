import { z } from "zod"
import * as schemas from "$/schemas"

export const basePath = "/users"

export const getUsersPath = "/"

export function getUsersQuerySchema() {
    return z.object({
        ...schemas.pagination().shape,
        ...schemas.sorting("email", "username", "registrationDate").shape,
        email: schemas.models.user.email().optional(),
        username: schemas.models.user.username().optional()
    })
}

export type GetUsersQuery = z.infer<ReturnType<typeof getUsersQuerySchema>>

export const getUserPath = "/:id"

export function getUserParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type GetUserParams = z.infer<ReturnType<typeof getUserParamsSchema>>

export const assignRoleToUserPath = "/:id/role/:roleId"

export function assignRoleToUserParamsSchema() {
    return z.object({
        id: schemas.id(),
        roleId: schemas.id()
    })
}

export type AssignRoleToUserParams = z.infer<ReturnType<typeof assignRoleToUserParamsSchema>>

export const banUserPath = "/:id/ban"

export function banUserParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type BanUserParams = z.infer<ReturnType<typeof banUserParamsSchema>>

export const unbanUserPath = "/:id/unban"

export function unbanUserParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type UnbanUserParams = z.infer<ReturnType<typeof unbanUserParamsSchema>>
