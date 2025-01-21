import { z } from "zod"

import * as common from "$/common"
import * as models from "$/models"

// GetRoles

export function getRolesRequest() {
    return z.void()
}

export type GetRolesRequest = z.infer<ReturnType<typeof getRolesRequest>>

export function getRolesResponse() {
    return z.object({
        items: z.array(models.role.role())
    })
}

export type GetRolesResponse = z.infer<ReturnType<typeof getRolesResponse>>

// CreateRole

export function createRoleBody() {
    return z.object({
        name: models.role.name(),
        permissions: z.array(models.role.permission())
    })
}

export type CreateRoleBody = z.infer<ReturnType<typeof createRoleBody>>

export function createRoleRequest() {
    return z.object({
        ...createRoleBody().shape
    })
}

export type CreateRoleRequest = z.infer<ReturnType<typeof createRoleRequest>>

export function createRoleResponse() {
    return z.object({
        ...models.role.role().shape
    })
}

export type CreateRoleResponse = z.infer<ReturnType<typeof createRoleResponse>>

// UpdateRole

export function updateRoleParams() {
    return z.object({
        id: common.id()
    })
}

export type UpdateRoleParams = z.infer<ReturnType<typeof updateRoleParams>>

export function updateRoleBody() {
    return z.object({
        name: models.role.name().optional(),
        permissions: z.array(models.role.permission()).optional()
    })
}

export type UpdateRoleBody = z.infer<ReturnType<typeof updateRoleBody>>

export function updateRoleRequest() {
    return z.object({
        ...updateRoleParams().shape,
        ...updateRoleBody().shape
    })
}

export type UpdateRoleRequest = z.infer<ReturnType<typeof updateRoleRequest>>

export function updateRoleResponse() {
    return z.object({
        ...models.role.role().shape
    })
}

export type UpdateRoleResponse = z.infer<ReturnType<typeof updateRoleResponse>>

// DeleteRole

export function deleteRoleParams() {
    return z.object({
        id: common.id()
    })
}

export type DeleteRoleParams = z.infer<ReturnType<typeof deleteRoleParams>>

export function deleteRoleRequest() {
    return z.object({
        ...deleteRoleParams().shape
    })
}

export type DeleteRoleRequest = z.infer<ReturnType<typeof deleteRoleRequest>>

export function deleteRoleResponse() {
    return z.object({
        ...models.role.role().shape
    })
}

export type DeleteRoleResponse = z.infer<ReturnType<typeof deleteRoleResponse>>
