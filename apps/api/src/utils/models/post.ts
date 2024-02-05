import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { JsonObject } from "type-fest"
import { User, Post } from "@prisma/client"

export function dto(post: Post & { author: User }) {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: {
            id: post.author.id,
            username: post.author.username
        },
        creationDate: post.creationDate.toJSON(),
        editingDate: post.editingDate?.toJSON() ?? null
    } satisfies JsonObject
}

export async function get(app: FastifyInstance, id: number) {
    const post = await app.prisma.post.findFirst({
        where: { id },
        include: { author: { include: { role: true } } }
    })
    if (!post) throw new BadRequestError("Post with such ID was not found")
    return post
}
