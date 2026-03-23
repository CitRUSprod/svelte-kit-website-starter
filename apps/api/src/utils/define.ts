import type { FastifyInstance, FastifyRequest, RequestGenericInterface } from "fastify"
import type { JsonObject } from "type-fest"

import type { ReplyData } from "$/types/reply-data"

export function defineDto<Input, Output extends JsonObject>(dto: (input: Input) => Output) {
    return dto
}

export function defineRouteHandler<
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    Request extends RequestGenericInterface | void,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    Response extends JsonObject | void,
    RequestCookies extends Record<string, string | number> = Record<string, never>
>(
    handler: (
        app: FastifyInstance,
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        request: FastifyRequest<Request extends void ? RequestGenericInterface : Request>,
        requestCookies: RequestCookies
    ) => Promise<ReplyData<Response>>
) {
    return handler
}
