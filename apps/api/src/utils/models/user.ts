import * as constantsEnums from "@repo/constants/enums"
import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import type { JsonObject } from "type-fest"

import { enums } from "$/constants"
import type { Locale } from "$/i18n/helpers"
import type { UserData } from "$/types"

export function dto(user: UserData) {
    return {
        id: user.id,
        email: user.email,
        linkedAccounts: {
            email: user.email !== null,
            twitch: user.twitchId !== null
        },
        username: user.username,
        role: {
            id: user.role.id,
            name: user.role.name as Record<Locale, string>,
            permissions: user.role.permissions as Array<constantsEnums.Permission>
        },
        ban: user.ban && {
            id: user.ban.id,
            author: {
                id: user.ban.author.id,
                username: user.ban.author.username
            },
            reason: user.ban.reason,
            date: user.ban.date.toJSON()
        },
        registrationDate: user.registrationDate.toJSON(),
        avatar: user.avatar && `/files/${enums.ImgPath.Avatars}/${user.avatar}`
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const user = await app.prisma.user.findFirst({
        where: { id },
        include: { role: true, ban: { include: { author: true } } }
    })

    if (!user) {
        throw new BadRequestError(req.ll.userWithSuchIdWasNotFound())
    }

    return user
}
