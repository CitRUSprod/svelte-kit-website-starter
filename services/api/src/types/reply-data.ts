import { CookieSerializeOptions } from "@fastify/cookie"
import { JsonifiableObject } from "$/types"

export interface ReplyCookie {
    name: string
    value: string | undefined
    options?: CookieSerializeOptions
}

export interface ReplyData {
    payload?: JsonifiableObject
    cookies?: Array<ReplyCookie>
}
