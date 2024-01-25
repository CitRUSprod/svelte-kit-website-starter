import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { PrismaClient } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export const prisma: FastifyPluginCallback = (app, options, done) => {
    const client = new PrismaClient().$extends({
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
