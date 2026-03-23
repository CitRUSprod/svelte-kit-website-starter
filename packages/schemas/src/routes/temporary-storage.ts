import { z } from "@repo/utils"

import * as common from "$/common"
import * as models from "$/models"

// UploadImage

export function $uploadImageBody() {
    return z.object({
        img: common.$file()
    })
}

export type $UploadImageBody = z.infer<ReturnType<typeof $uploadImageBody>>

export function $uploadImageRequest() {
    return z.object({
        ...$uploadImageBody().shape
    })
}

export type $UploadImageRequest = z.infer<ReturnType<typeof $uploadImageRequest>>

export function $uploadImageResponse() {
    return models.temporaryImage.$temporaryImage()
}

export type $UploadImageResponse = z.infer<ReturnType<typeof $uploadImageResponse>>
