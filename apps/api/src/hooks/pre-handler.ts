import { FastifyPluginCallback } from "fastify"
import { HttpError, InternalServerError } from "http-errors-enhanced"
import { l, isLocale, Locales, TranslationFunctions } from "$/i18n/helpers"
import { UserPayload, UserData } from "$/types"

declare module "fastify" {
    interface FastifyRequest {
        ll: TranslationFunctions
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
