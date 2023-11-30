import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { Role } from "@prisma/client"
import { JsonifiableObject } from "$/types"

export function dto(role: Role): JsonifiableObject {
    return {
        id: role.id,
        name: role.name,
        permissions: role.permissions,
        protected: role.protected
    }
}

export async function get(app: FastifyInstance, id: number) {
    const role = await app.prisma.role.findFirst({ where: { id } })
    if (!role) throw new BadRequestError("Role with such ID was not found")
    return role
}
