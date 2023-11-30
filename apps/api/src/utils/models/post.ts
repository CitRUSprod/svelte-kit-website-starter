import { FastifyInstance } from "fastify"
import { BadRequestError } from "http-errors-enhanced"
import { User, Post } from "@prisma/client"
import { JsonifiableObject } from "$/types"

export function dto(post: Post & { author: User }): JsonifiableObject {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: {
            id: post.author.id,
            username: post.author.username
        },
        creationDate: post.creationDate,
        editingDate: post.editingDate
    }
}

export async function get(app: FastifyInstance, id: number) {
    const post = await app.prisma.post.findFirst({
        where: { id },
        include: { author: { include: { role: true } } }
    })
    if (!post) throw new BadRequestError("Post with such ID was not found")
    return post
}
