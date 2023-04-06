import path from "path"
import fs from "fs-extra"
import { MultipartFile } from "@fastify/multipart"
import sharp from "sharp"
import { v4 as createUuid } from "uuid"
import { ImgSize, ImgExtension } from "$/enums"

function getAbsPath(...paths: Array<string>) {
    return path.join(__dirname, "../files", ...paths)
}

function getExt(file: MultipartFile) {
    return path.extname(file.filename).toLowerCase()
}

const imgExtList: Array<string> = Object.values(ImgExtension)

export function isImgFile(file: MultipartFile) {
    return imgExtList.includes(getExt(file))
}

export async function writeFile(dirPath: string, file: MultipartFile) {
    const ext = getExt(file)
    const buffer = await file.toBuffer()

    const fileName = `${createUuid()}${ext}`
    const absDirPath = getAbsPath(dirPath)
    const absFilePath = path.join(absDirPath, fileName)

    await fs.ensureDir(absDirPath)

    if (isImgFile(file)) {
        const img = sharp(buffer)

        const { width, height } = await img.metadata()

        if (width && height) {
            if (width > ImgSize.MaxWidth) {
                img.resize({ width: ImgSize.MaxWidth })
            }

            if (height > ImgSize.MaxHeight) {
                img.resize({ height: ImgSize.MaxHeight })
            }
        }

        await img.toFile(absFilePath)
    } else {
        await fs.writeFile(absFilePath, buffer)
    }

    return fileName
}

export async function removeFile(dirPath: string, fileName: string) {
    await fs.remove(getAbsPath(dirPath, fileName))
}
