import type { FastifyPluginCallback } from "fastify"
import type { HttpError } from "http-errors-enhanced"
import { InternalServerError } from "http-errors-enhanced"

import type { Locale, TranslationFunctions } from "$/i18n/helpers"
import { l, isLocale } from "$/i18n/helpers"
import type { UserPayload } from "$/types"
import { models } from "$/utils"

declare module "fastify" {
    interface FastifyRequest {
        ll: TranslationFunctions
        tz: string
        userData?: models.user.Type
        authError?: HttpError
    }
}

export const preHandler: FastifyPluginCallback = (app, options, done) => {
    app.addHook("preHandler", async req => {
        let locale: Locale

        if (req.cookies.locale && isLocale(req.cookies.locale)) {
            locale = req.cookies.locale
        } else {
            locale = "en"
        }

        req.ll = l[locale]

        req.tz = req.cookies.timezone ?? "Europe/Moscow"

        let payload: UserPayload | undefined

        try {
            payload = await req.jwtVerify<UserPayload>()
        } catch (err: any) {
            req.authError = err
        }

        if (payload) {
            const user = await app.prisma.user.findUnique({
                where: { id: payload.id },
                include: models.user.include
            })

            if (user === null) {
                throw new InternalServerError(req.ll.userWithSuchIdWasNotFound())
            } else {
                req.userData = user
            }
        }
    })

    done()
}
