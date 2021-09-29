import baseAxios from "axios"
import { cookies } from "$lib/utils"
import { browser, dev } from "$app/env"

let baseUrl: string | undefined

if (!browser) {
    baseUrl = `http://${dev ? "localhost" : "nginx"}:6700`
}

export const axios = baseAxios.create({ baseURL: baseUrl })

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

                const cookie = cookies.getKeyValuePairs(cookieArray)
                const res = await axios.request({
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        cookie: cookie.length ? cookie.join("; ") : undefined
                    }
                })
                cookieArray = cookies.merge(cookieArray, res.headers["set-cookie"])

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
