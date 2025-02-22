import type { User, Post } from "@prisma/client"
import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import type { JsonObject } from "type-fest"

export function dto(post: Post & { author: User | null }) {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author && {
            id: post.author.id,
            username: post.author.username
        },
        creationDate: post.creationDate.toJSON(),
        editingDate: post.editingDate?.toJSON() ?? null
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const post = await app.prisma.post.findFirst({
        where: { id },
        include: { author: { include: { role: true } } }
    })

    if (!post) {
        throw new BadRequestError(req.ll.postWithSuchIdWasNotFound())
    }

    return post
}
