/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { CookieSerializeOptions } from "@fastify/cookie"
import { JsonObject } from "type-fest"

export interface ReplyCookie {
    name: string
    value: string | undefined
    options?: CookieSerializeOptions
}

export type ReplyData<T extends JsonObject | void> = {
    cookies?: Array<ReplyCookie>
} & (T extends void ? { payload?: Error | never } : { payload: Error | T })
