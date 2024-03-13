import { BadRequestError } from "http-errors-enhanced"
import * as schemasRoutes from "@local/schemas/routes"
import { models } from "$/utils"
import { RouteHandler } from "$/types"

export const getRoles = (async app => {
    const roles = await app.prisma.role.findMany()
    return { payload: { items: roles.map(models.role.dto) } }
}) satisfies RouteHandler<schemasRoutes.roles.GetRolesResponse>

export const createRole = (async (app, ll, { body }) => {
    const role = await app.prisma.role.create({ data: body })
    return { payload: models.role.dto(role) }
}) satisfies RouteHandler<
    schemasRoutes.roles.CreateRoleResponse,
    { body: schemasRoutes.roles.CreateRoleBody }
>

export const updateRole = (async (app, ll, { params, body }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError(ll.$roles.roleWithSuchIdIsProtected())

    const updatedRole = await app.prisma.role.update({ where: { id: params.id }, data: body })
    return { payload: models.role.dto(updatedRole) }
}) satisfies RouteHandler<
    schemasRoutes.roles.UpdateRoleResponse,
    {
        params: schemasRoutes.roles.UpdateRoleParams
        body: schemasRoutes.roles.UpdateRoleBody
    }
>

export const deleteRole = (async (app, ll, { params }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError(ll.$roles.roleWithSuchIdIsProtected())

    const deletedRole = await app.prisma.role.delete({ where: { id: params.id } })
    return { payload: models.role.dto(deletedRole) }
}) satisfies RouteHandler<
    schemasRoutes.roles.DeleteRoleResponse,
    { params: schemasRoutes.roles.DeleteRoleParams }
>
