import type { FastifyPluginCallback } from "fastify"
import { type HttpError, InternalServerError } from "http-errors-enhanced"
import { l, isLocale, type Locales, type TranslationFunctions } from "$/i18n/helpers"
import type { UserPayload, UserData } from "$/types"

declare module "fastify" {
    interface FastifyRequest {
        ll: TranslationFunctions
        tz: string
        userData?: UserData
        authError?: HttpError
    }
}

export const preHandler: FastifyPluginCallback = (app, options, done) => {
    app.addHook("preHandler", async req => {
        let locale: Locales

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
            const user = await app.prisma.user.findFirst({
                where: { id: payload.id },
                include: { role: true, ban: { include: { author: true } } }
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
