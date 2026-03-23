import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import type { JsonObject } from "type-fest"

import * as enums from "$/constants/enums"
import { Prisma } from "$/prisma/generated/client"
import { defineDto } from "$/utils"

export const include = {
    author: true
} as const satisfies Prisma.PostInclude

export type Type = Prisma.PostGetPayload<{ include: typeof include }>

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const post = await app.prisma.post.findFirst({
        where: { id },
        include
    })

    if (!post) {
        throw new BadRequestError(req.ll.postWithSuchIdWasNotFound())
    }

    return post
}

export const dto = defineDto(
    (post: Type) =>
        ({
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author && {
                id: post.author.id,
                username: post.author.username,
                avatar:
                    post.author.avatar && `/files/${enums.ImgPath.Avatars}/${post.author.avatar}`
            },
            creationDate: post.creationDate.toJSON(),
            editingDate: post.editingDate?.toJSON() ?? null
        }) satisfies JsonObject
)
