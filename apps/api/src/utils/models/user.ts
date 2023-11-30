import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { ImgPath } from "$/enums"
import { JsonifiableObject, PartialUserData } from "$/types"

export function dto(user: PartialUserData): JsonifiableObject {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: {
            id: user.role.id,
            name: user.role.name,
            permissions: user.role.permissions
        },
        confirmedEmail: user.confirmedEmail,
        banned: user.banned,
        registrationDate: user.registrationDate,
        avatar: user.avatar && `/api/files/${ImgPath.Avatars}/${user.avatar}`
    }
}

export async function get(app: FastifyInstance, id: number) {
    const user = await app.prisma.user.findFirst({ where: { id }, include: { role: true } })
    if (!user) throw new BadRequestError("User with such ID was not found")
    return user
}
