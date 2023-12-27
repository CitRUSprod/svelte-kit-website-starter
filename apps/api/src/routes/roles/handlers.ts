import { BadRequestError } from "http-errors-enhanced"
import { models } from "$/utils"
import { RouteHandler } from "$/types"
import * as common from "$/common"

export const getRoles: RouteHandler = async app => {
    const roles = await app.prisma.role.findMany()
    return { payload: { items: roles.map(models.role.dto) } }
}

export const createRole: RouteHandler<{ body: common.roles.CreateRoleBody }> = async (
    app,
    { body }
) => {
    const role = await app.prisma.role.create({ data: body })
    return { payload: models.role.dto(role) }
}

export const updateRole: RouteHandler<{
    params: common.roles.UpdateRoleParams
    body: common.roles.UpdateRoleBody
}> = async (app, { params, body }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError("Role with such ID is protected")

    const updatedRole = await app.prisma.role.update({ where: { id: params.id }, data: body })
    return { payload: models.role.dto(updatedRole) }
}

export const deleteRole: RouteHandler<{ params: common.roles.UpdateRoleParams }> = async (
    app,
    { params }
) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequestError("Role with such ID is protected")

    const updatedRole = await app.prisma.role.delete({ where: { id: params.id } })
    return { payload: models.role.dto(updatedRole) }
}
