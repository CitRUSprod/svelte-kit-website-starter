import { z } from "zod"
import * as common from "$/common"
import * as models from "$/models"

// GetUsers

export function getUsersQuery() {
    return z.object({
        ...common.pagination().shape,
        ...common.sorting("registrationDate", "email", "username").shape,
        email: models.user.email().optional(),
        username: models.user.username().optional()
    })
}

export type GetUsersQuery = z.infer<ReturnType<typeof getUsersQuery>>

export function getUsersRequest() {
    return z.object({
        ...getUsersQuery().partial().shape
    })
}

export type GetUsersRequest = z.infer<ReturnType<typeof getUsersRequest>>

export function getUsersResponse() {
    return z.object({
        ...common.itemsPage(models.user.user()).shape
    })
}

export type GetUsersResponse = z.infer<ReturnType<typeof getUsersResponse>>

// GetUser

export function getUserParams() {
    return z.object({
        id: common.id()
    })
}

export type GetUserParams = z.infer<ReturnType<typeof getUserParams>>

export function getUserRequest() {
    return z.object({
        ...getUserParams().shape
    })
}

export type GetUserRequest = z.infer<ReturnType<typeof getUserRequest>>

export function getUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type GetUserResponse = z.infer<ReturnType<typeof getUserResponse>>

// AssignRoleToUser

export function assignRoleToUserParams() {
    return z.object({
        id: common.id(),
        roleId: common.id()
    })
}

export type AssignRoleToUserParams = z.infer<ReturnType<typeof assignRoleToUserParams>>

export function assignRoleToUserRequest() {
    return z.object({
        ...assignRoleToUserParams().shape
    })
}

export type AssignRoleToUserRequest = z.infer<ReturnType<typeof assignRoleToUserRequest>>

export function assignRoleToUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type AssignRoleToUserResponse = z.infer<ReturnType<typeof assignRoleToUserResponse>>

// BanUser

export function banUserParams() {
    return z.object({
        id: common.id()
    })
}

export type BanUserParams = z.infer<ReturnType<typeof banUserParams>>

export function banUserRequest() {
    return z.object({
        ...banUserParams().shape
    })
}

export type BanUserRequest = z.infer<ReturnType<typeof banUserRequest>>

export function banUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type BanUserResponse = z.infer<ReturnType<typeof banUserResponse>>

// UnbanUser

export function unbanUserParams() {
    return z.object({
        id: common.id()
    })
}

export type UnbanUserParams = z.infer<ReturnType<typeof unbanUserParams>>

export function unbanUserRequest() {
    return z.object({
        ...unbanUserParams().shape
    })
}

export type UnbanUserRequest = z.infer<ReturnType<typeof unbanUserRequest>>

export function unbanUserResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type UnbanUserResponse = z.infer<ReturnType<typeof unbanUserResponse>>
