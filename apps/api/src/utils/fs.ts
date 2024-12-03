import path from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"
import { MultipartFile } from "@fastify/multipart"
import sharp from "sharp"
import { v4 as createUuid } from "uuid"
import { env, enums } from "$/constants"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export function getAbsFilesPath(...paths: Array<string>) {
    return path.join(
        dirname,
        `../../..${env.IS_DOCKER_CONTAINER ? "" : "/storage"}/files`,
        ...paths
    )
}

function getExt(file: MultipartFile) {
    return path.extname(file.filename).toLowerCase()
}

const imgExtList: Array<string> = Object.values(enums.ImgExtension)

export function isImgFile(file: MultipartFile) {
    return imgExtList.includes(getExt(file))
}

export async function writeFile(dirPath: string, file: MultipartFile) {
    const ext = getExt(file)
    const buffer = await file.toBuffer()

    const fileName = `${createUuid()}${ext}`
    const absDirPath = getAbsFilesPath(dirPath)
    const absFilePath = path.join(absDirPath, fileName)

    await fs.ensureDir(absDirPath)

    if (isImgFile(file)) {
        const img = sharp(buffer)

        const { width, height } = await img.metadata()

        if (width && height) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            if (width > enums.ImgSize.MaxWidth) {
                img.resize({ width: enums.ImgSize.MaxWidth })
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            if (height > enums.ImgSize.MaxHeight) {
                img.resize({ height: enums.ImgSize.MaxHeight })
            }
        }

        await img.toFile(absFilePath)
    } else {
        await fs.writeFile(absFilePath, buffer)
    }

    return fileName
}

export async function removeFile(dirPath: string, fileName: string) {
    await fs.remove(getAbsFilesPath(dirPath, fileName))
}
