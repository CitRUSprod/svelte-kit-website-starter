import { z } from "zod"
import * as common from "$/common"
import * as models from "$/models"

export function getUsersQuery() {
    return z.object({
        ...common.pagination().shape,
        ...common.sorting("email", "username", "registrationDate").shape,
        email: models.user.email().optional(),
        username: models.user.username().optional()
    })
}

export type GetUsersQuery = z.infer<ReturnType<typeof getUsersQuery>>

export function getUserParams() {
    return z.object({
        id: common.id()
    })
}

export type GetUserParams = z.infer<ReturnType<typeof getUserParams>>

export function assignRoleToUserParams() {
    return z.object({
        id: common.id(),
        roleId: common.id()
    })
}

export type AssignRoleToUserParams = z.infer<ReturnType<typeof assignRoleToUserParams>>

export function banUserParams() {
    return z.object({
        id: common.id()
    })
}

export type BanUserParams = z.infer<ReturnType<typeof banUserParams>>

export function unbanUserParams() {
    return z.object({
        id: common.id()
    })
}

export type UnbanUserParams = z.infer<ReturnType<typeof unbanUserParams>>
