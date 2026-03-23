import type { FastifyInstance, FastifyRequest } from "fastify"
import { BadRequestError } from "http-errors-enhanced"

import { enums } from "$/constants"
import type { TemporaryImage } from "$/prisma/generated/client"
import { defineDto } from "$/utils"

export type Type = TemporaryImage

export async function get(app: FastifyInstance, req: FastifyRequest, id: number) {
    const temporaryImage = await app.prisma.temporaryImage.findUnique({
        where: { id }
    })

    if (!temporaryImage) {
        throw new BadRequestError(req.ll.temporaryImageWithSuchIdWasNotFound())
    }

    return temporaryImage
}

export const dto = defineDto((temporaryStorage: Type) => ({
    id: temporaryStorage.id,
    image: `/files/${enums.TemporaryStoragePath.Image}/${temporaryStorage.image}`
}))
