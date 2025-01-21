import * as schemasRoutes from "@local/schemas/routes"
import { BadRequestError } from "http-errors-enhanced"

import type { RouteHandler } from "$/types"
import { models } from "$/utils"

export const getRoles = (async app => {
    const roles = await app.prisma.role.findMany({ orderBy: { id: "asc" } })
    return { payload: { items: roles.map(models.role.dto) } }
}) satisfies RouteHandler<void, schemasRoutes.roles.GetRolesResponse>

export const createRole = (async (app, req) => {
    const role = await app.prisma.role.create({ data: req.body })
    return { payload: models.role.dto(role) }
}) satisfies RouteHandler<
    { Body: schemasRoutes.roles.CreateRoleBody },
    schemasRoutes.roles.CreateRoleResponse
>

export const updateRole = (async (app, req) => {
    const role = await models.role.get(app, req, req.params.id)

    if (role.protected) {
        throw new BadRequestError(req.ll.roleWithSuchIdIsProtected())
    }

    const updatedRole = await app.prisma.role.update({
        where: { id: req.params.id },
        data: req.body
    })
    return { payload: models.role.dto(updatedRole) }
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.roles.UpdateRoleParams
        Body: schemasRoutes.roles.UpdateRoleBody
    },
    schemasRoutes.roles.UpdateRoleResponse
>

export const deleteRole = (async (app, req) => {
    const role = await models.role.get(app, req, req.params.id)

    if (role.protected) {
        throw new BadRequestError(req.ll.roleWithSuchIdIsProtected())
    }

    const deletedRole = await app.prisma.role.delete({ where: { id: req.params.id } })
    return { payload: models.role.dto(deletedRole) }
}) satisfies RouteHandler<
    { Params: schemasRoutes.roles.DeleteRoleParams },
    schemasRoutes.roles.DeleteRoleResponse
>
