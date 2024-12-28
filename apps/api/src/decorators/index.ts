import changeScope from "fastify-plugin"
import { prisma } from "./prisma"
import { minio } from "./minio"
import { sendData } from "./send-data"
import { createPreHandler } from "./create-pre-handler"
import { verifyAuth } from "./verify-auth"
import { verifyPermission } from "./verify-permission"
import { verifyNotBanned } from "./verify-not-banned"

export const decorators = changeScope((app, options, done) => {
    app.register(changeScope(prisma))
        .register(changeScope(minio))
        .register(changeScope(sendData))
        .register(changeScope(createPreHandler))
        .register(changeScope(verifyAuth))
        .register(changeScope(verifyPermission))
        .register(changeScope(verifyNotBanned))

    done()
})
