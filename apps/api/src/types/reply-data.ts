/* eslint-disable @typescript-eslint/no-invalid-void-type */

import type { CookieSerializeOptions } from "@fastify/cookie"
import type { JsonObject } from "type-fest"

export interface ReplyCookie {
    name: string
    value: string | undefined
    options?: CookieSerializeOptions
}

export type ReplyData<T extends JsonObject | void> = {
    cookies?: Array<ReplyCookie>
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & (T extends void ? { payload?: Error | never } : { payload: Error | T })
