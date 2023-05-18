import basicAxios, { type AxiosResponseHeaders, type RawAxiosResponseHeaders } from "axios"
import { browser, dev } from "$app/environment"
import { env, uniqCookies } from "$lib/utils"

const baseUrl = browser || dev ? env.PUBLIC_BASE_URL : "http://nginx:6700"

export function getHeader<T = string>(
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders,
    headerName: string
) {
    if (typeof headers.get === "function") {
        return headers.get(headerName) as T
    } else {
        return undefined
    }
}

export function setHeader(
    headers: AxiosResponseHeaders | RawAxiosResponseHeaders,
    headerName: string,
    headerValue: any
) {
    if (typeof headers.set === "function") {
        headers.set(headerName, headerValue)
    }
}

export function headersToJson(headers: AxiosResponseHeaders | RawAxiosResponseHeaders) {
    if (typeof headers.toJSON === "function") {
        return headers.toJSON()
    } else {
        return {}
    }
}

export const axios = basicAxios.create({
    baseURL: baseUrl
})

axios.interceptors.response.use(
    res => res,
    async err => {
        if (err.response) {
            const url = new URL(err.response.config.url, baseUrl).toString()

            if (err.response.status === 401 && url.startsWith(baseUrl)) {
                const response = await basicAxios.post(
                    "/api/auth/refresh",
                    {},
                    {
                        baseURL: baseUrl,
                        headers: headersToJson(err.response.config.headers)
                    }
                )

                const cookies = getHeader(err.response.config.headers, "cookie")?.split("; ") ?? []
                const tokensSetCookies =
                    getHeader<Array<string>>(response.headers, "set-cookie") ?? []

                if (cookies.length > 0 || tokensSetCookies.length > 0) {
                    setHeader(
                        err.response.config.headers,
                        "cookie",
                        uniqCookies([
                            ...cookies,
                            ...tokensSetCookies.map(c => c.split("; ")[0])
                        ]).join("; ")
                    )
                }

                const res = await basicAxios({
                    ...err.response.config,
                    headers: headersToJson(err.response.config.headers)
                })

                const setCookie = getHeader<Array<string>>(res.headers, "set-cookie") ?? []

                if (setCookie.length > 0 || tokensSetCookies.length > 0) {
                    setHeader(
                        res.headers,
                        "set-cookie",
                        uniqCookies([...setCookie, ...tokensSetCookies])
                    )
                }

                return res
            }
        }

        throw err
    }
)

export function createAxiosConfig(headers?: Headers) {
    return {
        headers: headers ? Object.fromEntries(headers.entries()) : undefined
    }
}
