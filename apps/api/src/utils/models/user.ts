import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { JsonObject } from "type-fest"
import * as constantsEnums from "@local/constants/enums"
import { enums } from "$/constants"
import { UserData } from "$/types"

export function dto(user: UserData) {
    return {
        id: user.id,
        email: user.email ?? null,
        username: user.username,
        role: {
            id: user.role.id,
            name: user.role.name,
            permissions: user.role.permissions as Array<constantsEnums.Permission>
        },
        banned: user.banned,
        registrationDate: user.registrationDate.toJSON(),
        avatar: user.avatar && `/api/files/${enums.ImgPath.Avatars}/${user.avatar}`
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, id: number) {
    const user = await app.prisma.user.findFirst({ where: { id }, include: { role: true } })
    if (!user) throw new BadRequestError("User with such ID was not found")
    return user
}
