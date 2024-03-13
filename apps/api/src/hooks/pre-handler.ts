import { FastifyPluginCallback } from "fastify"
import { l, isLocale, Locales, TranslationFunctions } from "$/i18n/helpers"

declare module "fastify" {
    interface FastifyRequest {
        ll: TranslationFunctions
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
    })

    done()
}
