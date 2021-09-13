import baseAxios from "axios"
import { parse as cookieParse } from "cookie"
import { browser } from "$app/env"

const websiteUrl = "http://localhost:6700"

const axios = baseAxios.create({ baseURL: websiteUrl })

axios.interceptors.request.use(config => {
    if (browser) {
        const { accessToken } = cookieParse(document.cookie)

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    }

    return config
})

axios.interceptors.response.use(
    config => config,
    async err => {
        if (err.response.status === 401 && !err.config.isRetry) {
            err.config.isRetry = true
            await baseAxios.get("/api/auth/refresh", { baseURL: websiteUrl })
            const res = await axios.request(err.config)
            return res
        }

        throw err
    }
)

export default axios
