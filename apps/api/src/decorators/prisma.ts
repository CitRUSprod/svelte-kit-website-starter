import { PrismaPg } from "@prisma/adapter-pg"
import * as constantsEnums from "@repo/constants/enums"
import type { FastifyInstance, FastifyPluginCallback } from "fastify"

import { env } from "$/constants"
import { PrismaClient } from "$/prisma/generated/client"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export const prisma: FastifyPluginCallback = (app, options, done) => {
    const adapter = new PrismaPg({ connectionString: env.POSTGRES_URL })
    const client = new PrismaClient({ adapter }).$extends({
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
