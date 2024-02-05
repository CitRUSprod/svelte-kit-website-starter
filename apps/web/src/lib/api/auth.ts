import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

import type { RequestData } from "$lib/types"

export function register(data: RequestData<schemasRoutes.auth.RegisterRequest>) {
    return axios.post<schemasRoutes.auth.RegisterResponse>(
        createApiUrl(constantsRoutes.auth.register),
        {
            email: data.email,
            username: data.username,
            password: data.password
        },
        createAxiosConfig(data.headers)
    )
}

export function login(data: RequestData<schemasRoutes.auth.LoginRequest>) {
    return axios.post<schemasRoutes.auth.LoginResponse>(
        createApiUrl(constantsRoutes.auth.login),
        {
            email: data.email,
            password: data.password
        },
        createAxiosConfig(data.headers)
    )
}

export function logout(data: RequestData<schemasRoutes.auth.LogoutRequest> = {}) {
    return axios.post<schemasRoutes.auth.LogoutResponse>(
        createApiUrl(constantsRoutes.auth.logout),
        {},
        createAxiosConfig(data.headers)
    )
}

export function refreshTokens(data: RequestData<schemasRoutes.auth.RefreshTokensRequest> = {}) {
    return axios.post<schemasRoutes.auth.RefreshTokensResponse>(
        createApiUrl(constantsRoutes.auth.refreshTokens),
        {},
        createAxiosConfig(data.headers)
    )
}
