/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { FastifyInstance, FastifyRequest, RequestGenericInterface } from "fastify"
import { JsonObject } from "type-fest"
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
    Request extends RequestGenericInterface | void,
    Response extends JsonObject | void,
    RequestCookies extends Record<string, string | number> = Record<string, never>
> = (
    app: FastifyInstance,
    request: FastifyRequest<Request extends void ? RequestGenericInterface : Request>,
    requestCookies: RequestCookies
) => Promise<ReplyData<Response>>
