import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { prisma } from "./prisma"
import { sendData } from "./send-data"
import { createPreHandler } from "./create-pre-handler"
import { setUserData } from "./set-user-data"
import { verifyAuth } from "./verify-auth"
import { verifyPermission } from "./verify-permission"
import { verifyNotBanned } from "./verify-not-banned"

function changeScope(fn: FastifyPluginCallback) {
    return fp(fn)
}

export const decorators = changeScope((app, options, done) => {
    app.register(changeScope(prisma))
        .register(changeScope(sendData))
        .register(changeScope(createPreHandler))
        .register(changeScope(setUserData))
        .register(changeScope(verifyAuth))
        .register(changeScope(verifyPermission))
        .register(changeScope(verifyNotBanned))

    done()
})
