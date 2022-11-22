import { axios, createAxiosConfig } from "$lib/utils"

interface LoginData {
    headers?: Headers
    email: string
    password: string
}

export function login(data: LoginData) {
    return axios.post<undefined>(
        "/api/auth/login",
        {
            email: data.email,
            password: data.password
        },
        createAxiosConfig(data.headers)
    )
}

interface LogoutData {
    headers?: Headers
}

export function logout(data: LogoutData = {}) {
    return axios.post<undefined>("/api/auth/logout", {}, createAxiosConfig(data.headers))
}

interface RefreshTokensData {
    headers?: Headers
}

export function refreshTokens(data: RefreshTokensData = {}) {
    return axios.post<undefined>("/api/auth/refresh", {}, createAxiosConfig(data.headers))
}
