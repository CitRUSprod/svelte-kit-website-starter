import { axios, createAxiosConfig } from "$lib/utils"

interface RegisterData {
    headers?: Headers
    email: string
    username: string
    password: string
}

export function register(data: RegisterData) {
    return axios.post<undefined>(
        "/api/auth/register",
        {
            email: data.email,
            username: data.username,
            password: data.password
        },
        createAxiosConfig(data.headers)
    )
}

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
