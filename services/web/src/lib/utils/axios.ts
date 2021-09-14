import baseAxios from "axios"
import { parse as cookieParse } from "cookie"
import { browser, dev } from "$app/env"

let baseUrl: string | undefined

if (!browser) {
    baseUrl = `http://${dev ? "localhost" : "nginx"}:6700`
}

const axios = baseAxios.create()

axios.interceptors.request.use(config => {
    config.baseURL = baseUrl

    let accessToken: string | undefined

    if (browser) {
        accessToken = cookieParse(document.cookie).accessToken
    } else {
        const { cookie } = config.headers

        if (cookie) {
            accessToken = cookieParse(cookie).accessToken
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
                const cookieArray: Array<string> = []

                const { headers } = await baseAxios.post(
                    "/api/auth/refresh",
                    {},
                    {
                        baseURL: baseUrl,
                        headers: error.config.headers
                    }
                )
                cookieArray.push(...(headers["set-cookie"] ?? []))

                const cookie = cookieArray.map(c => c.split("; ")[0]).join("; ")
                const res = await axios.request({
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        cookie: cookie || undefined
                    }
                })
                cookieArray.push(...(res.headers["set-cookie"] ?? []))

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

export default axios
