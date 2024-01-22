import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { JsonObject } from "type-fest"
import * as enums from "$/enums"
import { PartialUserData } from "$/types"

export function dto(user: PartialUserData): JsonObject {
    return {
        id: user.id,
        email: user.email ?? null,
        username: user.username,
        role: {
            id: user.role.id,
            name: user.role.name,
            permissions: user.role.permissions
        },
        confirmedEmail: user.confirmedEmail ?? null,
        banned: user.banned,
        registrationDate: user.registrationDate.toJSON(),
        avatar: user.avatar && `/api/files/${enums.ImgPath.Avatars}/${user.avatar}`
    }
}

export async function get(app: FastifyInstance, id: number) {
    const user = await app.prisma.user.findFirst({ where: { id }, include: { role: true } })
    if (!user) throw new BadRequestError("User with such ID was not found")
    return user
}
