import baseKy, { HTTPError } from "ky"
import * as cookies from "./cookies"
import { browser, dev } from "$app/env"

declare module "ky" {
    interface NormalizedOptions {
        cookie?: Array<string>
    }
}

const baseUrl = browser ? "/" : `http://${dev ? "localhost" : "nginx"}:6700`

export const ky = baseKy.create({
    prefixUrl: baseUrl,
    retry: {
        statusCodes: [401]
    },
    hooks: {
        beforeRetry: [
            async ({ request, options, error }) => {
                if (error instanceof HTTPError && error.response.status === 401) {
                    const { headers } = await baseKy.post("api/auth/refresh", {
                        prefixUrl: baseUrl,
                        headers: request.headers
                    })
                    const cookieArray = cookies.getSetFromHeaders(headers)
                    const cookie = cookies.getKeyValuePairs(cookieArray)

                    options.cookie = cookieArray

                    if (cookie.length) request.headers.set("cookie", cookie.join("; "))
                }
            }
        ],
        afterResponse: [
            async (req, opts, res) => {
                if (opts.cookie) {
                    const cookie = cookies.getSetFromHeaders(res.headers)
                    res.headers.set("set-cookie", cookies.merge(opts.cookie, cookie).join(", "))
                }

                return res
            }
        ]
    }
})
