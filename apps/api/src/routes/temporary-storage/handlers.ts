import type { MultipartFile } from "@fastify/multipart"
import * as schemasRoutes from "@repo/schemas/routes"
import { InternalServerError, BadRequestError } from "http-errors-enhanced"

import * as utils from "./utils"

import { enums } from "$/constants"
import { defineRouteHandler, isImgFile, models } from "$/utils"

export const uploadImage = defineRouteHandler<
    {
        Body: schemasRoutes.temporaryStorage.$UploadImageBody
    },
    schemasRoutes.temporaryStorage.$UploadImageResponse
>(async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const img = req.body.img as MultipartFile

    if (!isImgFile(img)) {
        throw new BadRequestError(req.ll.fileIsNotImage())
    }

    await utils.deleteExpiredTemporaryImages(app)

    const image = await app.minio.writeFile(enums.TemporaryStoragePath.Image, img)

    const temporaryImage = await app.prisma.temporaryImage.create({
        data: {
            image,
            creationDate: new Date()
        }
    })

    return {
        payload: models.temporaryImage.dto(temporaryImage)
    }
})
