import { z } from "zod"
import * as schemas from "$/schemas"

export const basePath = "/roles"

export const getRolesPath = "/"

export const createRolePath = "/"

export function createRoleBodySchema() {
    return z.object({
        name: schemas.models.role.name(),
        permissions: schemas.models.role.permissions()
    })
}

export type CreateRoleBody = z.infer<ReturnType<typeof createRoleBodySchema>>

export const updateRolePath = "/:id"

export function updateRoleParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type UpdateRoleParams = z.infer<ReturnType<typeof updateRoleParamsSchema>>

export function updateRoleBodySchema() {
    return z.object({
        name: schemas.models.role.name().optional(),
        permissions: schemas.models.role.permissions().optional()
    })
}

export type UpdateRoleBody = z.infer<ReturnType<typeof updateRoleBodySchema>>

export const deleteRolePath = "/:id"

export function deleteRoleParamsSchema() {
    return z.object({
        id: schemas.id()
    })
}

export type DeleteRoleParams = z.infer<ReturnType<typeof deleteRoleParamsSchema>>
