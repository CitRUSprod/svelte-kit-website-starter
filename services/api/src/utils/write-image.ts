import path from "path"
import fs from "fs-extra"
import { promisify } from "util"
import { pipeline } from "stream"
import { MultipartFile } from "@fastify/multipart"
import sharp from "sharp"
import { v4 as createUuid } from "uuid"

const pump = promisify(pipeline)

export async function writeImage(image: MultipartFile) {
    const buffer = await image.toBuffer()
    const name = `${createUuid()}.jpg`

    const dirPath = path.join(__dirname, "../storage/images/avatars")
    const filePath = `${dirPath}/${name}`

    await fs.ensureDir(dirPath)
    await pump(sharp(buffer).jpeg(), fs.createWriteStream(filePath))

    return name
}
