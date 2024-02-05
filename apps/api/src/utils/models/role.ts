import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { JsonObject } from "type-fest"
import { Role } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"

export function dto(role: Role) {
    return {
        id: role.id,
        name: role.name,
        permissions: role.permissions as Array<constantsEnums.Permission>,
        protected: role.protected
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, id: number) {
    const role = await app.prisma.role.findFirst({ where: { id } })
    if (!role) throw new BadRequestError("Role with such ID was not found")
    return role
}
