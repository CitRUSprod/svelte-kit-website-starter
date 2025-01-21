import changeScope from "fastify-plugin"

import { createPreHandler } from "./create-pre-handler"
import { minio } from "./minio"
import { prisma } from "./prisma"
import { sendData } from "./send-data"
import { verifyAuth } from "./verify-auth"
import { verifyNotBanned } from "./verify-not-banned"
import { verifyPermission } from "./verify-permission"

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
