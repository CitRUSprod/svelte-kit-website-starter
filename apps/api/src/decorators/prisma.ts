import { PrismaPg } from "@prisma/adapter-pg"
import * as constantsEnums from "@repo/constants/enums"
import type { FastifyInstance, FastifyPluginCallback } from "fastify"

import { env } from "$/constants"
import { ImgPath } from "$/constants/enums"
import { PrismaClient } from "$/prisma/generated/client"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export const prisma: FastifyPluginCallback = (app, options, done) => {
    const adapter = new PrismaPg({ connectionString: env.POSTGRES_URL })
    const client = new PrismaClient({ adapter }).$extends({
        query: {
            user: {
                async update({ args, query }) {
                    if (args.data.avatar === null) {
                        const user = await client.user.findUnique({
                            where: args.where
                        })

                        if (user?.avatar) {
                            await app.minio.removeFile(ImgPath.Avatars, user.avatar)
                        }
                    }

                    return query(args)
                },
                async updateMany({ args, query }) {
                    if (args.data.avatar === null) {
                        const users = await client.user.findMany({
                            where: args.where
                        })

                        for (const user of users) {
                            if (user.avatar) {
                                await app.minio.removeFile(ImgPath.Avatars, user.avatar)
                            }
                        }
                    }

                    return query(args)
                },
                async delete({ args, query }) {
                    const user = await client.user.findUnique({
                        where: args.where
                    })

                    if (user?.avatar) {
                        await app.minio.removeFile(ImgPath.Avatars, user.avatar)
                    }

                    return query(args)
                },
                async deleteMany({ args, query }) {
                    const users = await client.user.findMany({
                        where: args.where
                    })

                    for (const user of users) {
                        if (user.avatar) {
                            await app.minio.removeFile(ImgPath.Avatars, user.avatar)
                        }
                    }

                    return query(args)
                }
            }
        },
        result: {
            role: {
                permissions: {
                    needs: { id: true, permissions: true },
                    compute(role) {
                        if (role.id === 2) {
                            return Object.values(constantsEnums.Permission)
                        } else {
                            return role.permissions
                        }
                    }
                }
            }
        }
    })

    client.$connect().then(() => {
        app.decorate<FastifyInstance["prisma"]>("prisma", client as any)

        done()
    })
}
