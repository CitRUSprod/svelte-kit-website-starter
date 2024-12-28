import { Client } from "minio"
import type { FastifyInstance, FastifyPluginCallback } from "fastify"
import type { MultipartFile } from "@fastify/multipart"
import sharp from "sharp"
import { v4 as createUuid } from "uuid"
import { env, enums } from "$/constants"
import { getExt, isImgFile } from "$/utils"

declare module "fastify" {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    interface FastifyInstance {
        minio: {
            writeFile(dirPath: string, file: MultipartFile): Promise<string>
            removeFile(dirPath: string, fileName: string): Promise<void>
        }
    }
}

const bucketName = "files"

export const minio: FastifyPluginCallback = (app, options, done) => {
    const minioClient = new Client({
        endPoint: env.IS_DOCKER_CONTAINER ? "minio" : "localhost",
        port: 9000,
        useSSL: false,
        accessKey: env.MINIO_USER,
        secretKey: env.MINIO_PASSWORD
    })

    async function createBucketIfNotExists() {
        if (!(await minioClient.bucketExists(bucketName))) {
            await minioClient.makeBucket(bucketName)

            const policy = {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Principal: {
                            AWS: ["*"]
                        },
                        Action: ["s3:GetObject"],
                        Resource: [`arn:aws:s3:::${bucketName}/*`]
                    }
                ]
            }
            await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy))
        }
    }

    async function writeFile(dirPath: string, file: MultipartFile) {
        const ext = getExt(file)
        const buffer = await file.toBuffer()
        const fileName = `${createUuid()}${ext}`
        const objectName = `${dirPath}/${fileName}`

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

            const processedBuffer = await img.toBuffer()
            await minioClient.putObject(bucketName, objectName, processedBuffer)
        } else {
            await minioClient.putObject(bucketName, objectName, buffer)
        }

        return fileName
    }

    async function removeFile(dirPath: string, fileName: string) {
        const objectName = `${dirPath}/${fileName}`
        await minioClient.removeObject(bucketName, objectName)
    }

    createBucketIfNotExists().then(() => {
        app.decorate<FastifyInstance["minio"]>("minio", { writeFile, removeFile })

        done()
    })
}
