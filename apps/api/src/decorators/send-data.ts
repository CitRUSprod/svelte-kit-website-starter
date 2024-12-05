/* eslint-disable @typescript-eslint/no-invalid-void-type */

import type { FastifyReply, FastifyPluginCallback } from "fastify"
import type { JsonObject } from "type-fest"
import type { ReplyData } from "$/types"

declare module "fastify" {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    interface FastifyReply {
        sendData<T extends JsonObject | void>(data: ReplyData<T>): Promise<void>
    }
}

export const sendData: FastifyPluginCallback = (app, options, done) => {
    app.decorateReply<FastifyReply["sendData"]>("sendData", async function (this, data) {
        if (data.cookies) {
            for (const cookie of data.cookies) {
                if (cookie.value === undefined) {
                    this.clearCookie(cookie.name, cookie.options)
                } else {
                    this.setCookie(cookie.name, cookie.value, cookie.options)
                }
            }
        }

        await this.send((data as any).payload)
    })

    done()
}
