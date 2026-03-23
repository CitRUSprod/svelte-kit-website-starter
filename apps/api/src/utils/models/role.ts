import * as constantsEnums from "@repo/constants/enums"
import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"

import type { Locale } from "$/i18n/helpers"
import { Prisma } from "$/prisma/generated/client"
import { defineDto } from "$/utils"

export const include = {} as const satisfies Prisma.RoleInclude

export type Type = Prisma.RoleGetPayload<{ include: typeof include }>

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const role = await app.prisma.role.findUnique({
        where: { id },
        include
    })

    if (!role) {
        throw new BadRequestError(req.ll.roleWithSuchIdWasNotFound())
    }

    return role
}

export const dto = defineDto((role: Type) => ({
    id: role.id,
    name: role.name as Record<Locale, string>,
    permissions: role.permissions as Array<constantsEnums.Permission>,
    protected: role.protected
}))
