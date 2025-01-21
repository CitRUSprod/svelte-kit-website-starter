import path from "node:path"

import type { MultipartFile } from "@fastify/multipart"

import { enums } from "$/constants"

export function getExt(file: MultipartFile) {
    return path.extname(file.filename).toLowerCase()
}

const imgExtList: Array<string> = Object.values(enums.ImgExtension)

export function isImgFile(file: MultipartFile) {
    return imgExtList.includes(getExt(file))
}
