import baseAxios from "axios"
import { parse as parseCookie } from "cookie"
import { browser, dev } from "$app/env"

let baseUrl: string | undefined

if (!browser) {
    baseUrl = `http://${dev ? "localhost" : "nginx"}:6700`
}

export const axios = baseAxios.create({ baseURL: baseUrl })

function getCookieValues(cookieArray: Array<string>) {
    return cookieArray.map(c => c.split("; ")[0])
}

function mergeCookie(...cookieArrays: Array<Array<string> | undefined>) {
    const cookieArray: Array<string> = []

    for (const arr of cookieArrays) {
        if (arr) {
            cookieArray.push(...arr)
        }
    }

    const obj: Record<string, string> = {}

    for (const cookie of cookieArray) {
        const name = cookie.split("=")[0]
        obj[name] = cookie
    }

    const result = Object.values(obj)

    return result
}

axios.interceptors.request.use(config => {
    let accessToken: string | undefined

    if (browser) {
        accessToken = parseCookie(document.cookie).accessToken
    } else {
        const { cookie } = config.headers

        if (cookie) {
            accessToken = parseCookie(cookie).accessToken
        }
    }

    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`
    }

    return config
})

axios.interceptors.response.use(
    config => config,
    async error => {
        if (error.response.status === 401 && !error.config.isRetry) {
            error.config.isRetry = true

            try {
                const { headers } = await baseAxios.post(
                    "/api/auth/refresh",
                    {},
                    {
                        baseURL: baseUrl,
                        headers: error.config.headers
                    }
                )
                let cookieArray: Array<string> = headers["set-cookie"] ?? []

                const cookie = getCookieValues(cookieArray)
                const res = await axios.request({
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        cookie: cookie.length ? cookie.join("; ") : undefined
                    }
                })
                cookieArray = mergeCookie(cookieArray, res.headers["set-cookie"])

                return {
                    ...res,
                    headers: {
                        ...res.headers,
                        "set-cookie": cookieArray
                    }
                }
            } catch (err: unknown) {}
        }

        throw error
    }
)
