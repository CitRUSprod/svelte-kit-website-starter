import type { FastifyInstance } from "fastify"

import { enums } from "$/constants"

export async function deleteExpiredTemporaryImages(app: FastifyInstance) {
    const images = await app.prisma.temporaryImage.findMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TemporaryStorageTtl.Image * 1000) }
        }
    })

    for (const img of images) {
        await app.minio.removeFile(enums.TemporaryStoragePath.Image, img.image)
    }

    await app.prisma.temporaryImage.deleteMany({
        where: {
            id: { in: images.map(img => img.id) }
        }
    })
}
