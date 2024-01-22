import { BadRequestError } from "http-errors-enhanced"
import * as schemasRoutes from "@local/schemas/routes"
import { models } from "$/utils"
import { RouteHandler } from "$/types"

export const getRoles = (async app => {
    const roles = await app.prisma.role.findMany()
    return { payload: { items: roles.map(models.role.dto) } }
}) satisfies RouteHandler

export const createRole = (async (app, { body }) => {
    const role = await app.prisma.role.create({ data: body })
    return { payload: models.role.dto(role) }
}) satisfies RouteHandler<{ body: schemasRoutes.roles.CreateRoleBody }>

export const updateRole = (async (app, { params, body }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError("Role with such ID is protected")

    const updatedRole = await app.prisma.role.update({ where: { id: params.id }, data: body })
    return { payload: models.role.dto(updatedRole) }
}) satisfies RouteHandler<{
    params: schemasRoutes.roles.UpdateRoleParams
    body: schemasRoutes.roles.UpdateRoleBody
}>

export const deleteRole = (async (app, { params }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError("Role with such ID is protected")

    const deletedRole = await app.prisma.role.delete({ where: { id: params.id } })
    return { payload: models.role.dto(deletedRole) }
}) satisfies RouteHandler<{ params: schemasRoutes.roles.DeleteRoleParams }>
