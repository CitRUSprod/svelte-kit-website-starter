import { z } from "zod"
import * as common from "$/common"
import * as models from "$/models"

export function createRoleBody() {
    return z.object({
        name: models.role.name(),
        permissions: models.role.permissions()
    })
}

export type CreateRoleBody = z.infer<ReturnType<typeof createRoleBody>>

export function updateRoleParams() {
    return z.object({
        id: common.id()
    })
}

export type UpdateRoleParams = z.infer<ReturnType<typeof updateRoleParams>>

export function updateRoleBody() {
    return z.object({
        name: models.role.name().optional(),
        permissions: models.role.permissions().optional()
    })
}

export type UpdateRoleBody = z.infer<ReturnType<typeof updateRoleBody>>

export function deleteRoleParams() {
    return z.object({
        id: common.id()
    })
}

export type DeleteRoleParams = z.infer<ReturnType<typeof deleteRoleParams>>
