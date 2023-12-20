import { z } from "zod"
import * as schemas from "$/schemas"

export const createRoleBody = z.object({
    name: schemas.models.role.name(),
    permissions: schemas.models.role.permissions()
})

export type CreateRoleBody = z.infer<typeof createRoleBody>

export const updateRoleParams = z.object({
    id: schemas.id()
})

export type UpdateRoleParams = z.infer<typeof updateRoleParams>

export const updateRoleBody = z.object({
    name: schemas.models.role.name().optional(),
    permissions: schemas.models.role.permissions().optional()
})

export type UpdateRoleBody = z.infer<typeof updateRoleBody>

export const deleteRoleParams = z.object({
    id: schemas.id()
})

export type DeleteRoleParams = z.infer<typeof deleteRoleParams>
