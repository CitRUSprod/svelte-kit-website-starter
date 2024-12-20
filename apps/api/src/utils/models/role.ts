import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import type { JsonObject } from "type-fest"
import type { Role } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"
import type { Locale } from "$/i18n/helpers"

export function dto(role: Role) {
    return {
        id: role.id,
        name: role.name as Record<Locale, string>,
        permissions: role.permissions as Array<constantsEnums.Permission>,
        protected: role.protected
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const role = await app.prisma.role.findFirst({ where: { id } })

    if (!role) {
        throw new BadRequestError(req.ll.roleWithSuchIdWasNotFound())
    }

    return role
}
