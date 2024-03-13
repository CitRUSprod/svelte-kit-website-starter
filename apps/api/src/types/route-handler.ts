/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { FastifyInstance } from "fastify"
import { JsonObject } from "type-fest"
import { TranslationFunctions } from "$/i18n/helpers"
import { UserData } from "./user"
import { ReplyData } from "./reply-data"

export interface RequestData {
    userData?: UserData
    cookies?: Record<string, string>
    params?: Record<string, string | number>
    query?: Record<string, unknown>
    body?: Record<string, any>
}

export type RouteHandler<
    T extends JsonObject | void,
    K extends RequestData = Record<string, never>
> = (app: FastifyInstance, ll: TranslationFunctions, requestData: K) => Promise<ReplyData<T>>
