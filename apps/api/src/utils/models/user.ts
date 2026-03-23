import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"

import { dto as roleDto } from "./role"

import { enums } from "$/constants"
import { Prisma } from "$/prisma/generated/client"
import { defineDto } from "$/utils"

export const include = {
    role: true,
    ban: {
        include: {
            author: true
        }
    }
} as const satisfies Prisma.UserInclude

export type Type = Prisma.UserGetPayload<{ include: typeof include }>

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const user = await app.prisma.user.findUnique({
        where: { id },
        include
    })

    if (!user) {
        throw new BadRequestError(req.ll.userWithSuchIdWasNotFound())
    }

    return user
}

interface SimpleType {
    id: Type["id"]
    username: Type["username"]
    avatar: Type["avatar"]
    [key: string]: unknown
}

export const simpleDto = defineDto((user: SimpleType) => ({
    id: user.id,
    username: user.username,
    avatar: user.avatar && `/files/${enums.ImgPath.Avatars}/${user.avatar}`
}))

export const dto = defineDto((user: Type) => ({
    id: user.id,
    email: user.email,
    linkedAccounts: {
        email: user.email !== null,
        twitch: user.twitchId !== null
    },
    username: user.username,
    role: roleDto(user.role),
    ban: user.ban && {
        id: user.ban.id,
        author: simpleDto(user.ban.author),
        reason: user.ban.reason,
        date: user.ban.date.toJSON()
    },
    registrationDate: user.registrationDate.toJSON(),
    avatar: user.avatar && `/files/${enums.ImgPath.Avatars}/${user.avatar}`
}))
