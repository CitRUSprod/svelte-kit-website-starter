/* global globalThis */

import { browser, dev } from "$app/env"
import * as cookies from "./cookies"

import type { JsonObject } from "type-fest"

interface Options {
    headers?: Headers
    fetch?: typeof fetch
    searchParams?: URLSearchParams
    json?: JsonObject
}

const baseUrl = browser ? location.origin : `http://${dev ? "localhost" : "nginx"}:6700`

export class HttpError extends Error {
    public response: Response

    public constructor(response: Response) {
        super(response.statusText)

        this.name = "HttpError"
        this.response = response
    }
}

class Fetchy {
    private async _fetch(
        method: string,
        url: string,
        options: Options = {},
        retryNumber = 1,
        cookieAcc?: Array<string>
    ): Promise<Response> {
        options.headers ??= new Headers()
        options.fetch ??= fetch.bind(globalThis)

        const u = new URL(url, baseUrl)
        if (options.searchParams) u.search = options.searchParams.toString()
        const request = new Request(u.toString(), {
            method,
            headers: options.headers,
            body: options.json && JSON.stringify(options.json)
        })

        const response = await options.fetch(request)

        if (response.ok) {
            if (cookieAcc) {
                const cookie = cookies.getSetFromHeaders(response.headers)
                response.headers.set("set-cookie", cookies.merge(cookieAcc, cookie).join(", "))
            }

            return response
        } else {
            if (response.status === 401 && retryNumber < 2) {
                const refreshUrl = new URL("/api/auth/refresh", baseUrl)
                const req = new Request(refreshUrl.toString(), {
                    method: "post",
                    headers: request.headers
                })

                const { headers } = await options.fetch(req)
                const cookieArray = cookies.getSetFromHeaders(headers)
                const cookie = cookies.getKeyValuePairs(cookieArray)

                if (cookie.length) options.headers.set("cookie", cookie.join("; "))

                const res = await this._fetch(method, url, options, retryNumber + 1, cookieArray)
                return res
            }

            throw new HttpError(response)
        }
    }

    public get(url: string, options?: Options) {
        return this._fetch("GET", url, options)
    }

    public post(url: string, options?: Options) {
        return this._fetch("POST", url, options)
    }

    public put(url: string, options?: Options) {
        return this._fetch("PUT", url, options)
    }

    public delete(url: string, options?: Options) {
        return this._fetch("DELETE", url, options)
    }

    public patch(url: string, options?: Options) {
        return this._fetch("PATCH", url, options)
    }
}

export const fetchy = new Fetchy()
