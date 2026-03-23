import * as schemasRoutes from "@repo/schemas/routes"
import { BadRequestError } from "http-errors-enhanced"

import { defineRouteHandler, models } from "$/utils"

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const getRoles = defineRouteHandler<void, schemasRoutes.roles.$GetRolesResponse>(
    async app => {
        const roles = await app.prisma.role.findMany({ orderBy: { id: "asc" } })

        return {
            payload: {
                items: roles.map(role => models.role.dto(role))
            }
        }
    }
)

export const createRole = defineRouteHandler<
    { Body: schemasRoutes.roles.$CreateRoleBody },
    schemasRoutes.roles.$CreateRoleResponse
>(async (app, req) => {
    const role = await app.prisma.role.create({ data: req.body })

    return {
        payload: models.role.dto(role)
    }
})

export const updateRole = defineRouteHandler<
    { Params: schemasRoutes.roles.$UpdateRoleParams; Body: schemasRoutes.roles.$UpdateRoleBody },
    schemasRoutes.roles.$UpdateRoleResponse
>(async (app, req) => {
    const role = await models.role.get(app, req, req.params.id)

    if (role.protected) {
        throw new BadRequestError(req.ll.roleWithSuchIdIsProtected())
    }

    const updatedRole = await app.prisma.role.update({
        where: { id: req.params.id },
        data: req.body
    })

    return {
        payload: models.role.dto(updatedRole)
    }
})

export const deleteRole = defineRouteHandler<
    { Params: schemasRoutes.roles.$DeleteRoleParams },
    schemasRoutes.roles.$DeleteRoleResponse
>(async (app, req) => {
    const role = await models.role.get(app, req, req.params.id)

    if (role.protected) {
        throw new BadRequestError(req.ll.roleWithSuchIdIsProtected())
    }

    const deletedRole = await app.prisma.role.delete({ where: { id: req.params.id } })

    return {
        payload: models.role.dto(deletedRole)
    }
})
