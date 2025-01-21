import * as constantsRoutes from "@local/constants/routes"
import * as schemasRoutes from "@local/schemas/routes"

import type { RequestData } from "$lib/types"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

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

export function completeRegistration(
    data: RequestData<schemasRoutes.auth.CompleteRegistrationRequest>
) {
    return axios.post<schemasRoutes.auth.CompleteRegistrationResponse>(
        createApiUrl(constantsRoutes.auth.completeRegistration, data.registrationToken),
        {},
        createAxiosConfig(data.headers)
    )
}

export function oAuthRegister(data: RequestData<schemasRoutes.auth.OAuthRegisterRequest>) {
    return axios.post<schemasRoutes.auth.OAuthRegisterResponse>(
        createApiUrl(constantsRoutes.auth.oAuthRegister, data.oAuthRegistrationToken),
        {
            username: data.username
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

export function oAuthLogin(data: RequestData<schemasRoutes.auth.OAuthLoginRequest>) {
    return axios.post<schemasRoutes.auth.OAuthLoginResponse>(
        createApiUrl(constantsRoutes.auth.oAuthLogin, data.provider),
        {},
        createAxiosConfig(data.headers)
    )
}

export function link(data: RequestData<schemasRoutes.auth.LinkRequest>) {
    return axios.post<schemasRoutes.auth.LinkResponse>(
        createApiUrl(constantsRoutes.auth.link),
        {
            email: data.email,
            password: data.password
        },
        createAxiosConfig(data.headers)
    )
}

export function completeLinking(data: RequestData<schemasRoutes.auth.CompleteLinkingRequest>) {
    return axios.post<schemasRoutes.auth.CompleteLinkingResponse>(
        createApiUrl(constantsRoutes.auth.completeLinking, data.linkingToken),
        {},
        createAxiosConfig(data.headers)
    )
}

export function unlink(data: RequestData<schemasRoutes.auth.UnlinkRequest> = {}) {
    return axios.post<schemasRoutes.auth.UnlinkResponse>(
        createApiUrl(constantsRoutes.auth.unlink),
        {},
        createAxiosConfig(data.headers)
    )
}

export function completeUnlinking(data: RequestData<schemasRoutes.auth.CompleteUnlinkingRequest>) {
    return axios.post<schemasRoutes.auth.CompleteUnlinkingResponse>(
        createApiUrl(constantsRoutes.auth.completeUnlinking, data.unlinkingToken),
        {},
        createAxiosConfig(data.headers)
    )
}

export function oAuthLoginCallback(
    data: RequestData<schemasRoutes.auth.OAuthLoginCallbackRequest>
) {
    return axios.post<schemasRoutes.auth.OAuthLoginCallbackResponse>(
        createApiUrl(constantsRoutes.auth.oAuthLoginCallback, data.provider),
        {
            code: data.code,
            oAuthState: data.oAuthState
        },
        createAxiosConfig(data.headers)
    )
}

export function oAuthLinkCallback(data: RequestData<schemasRoutes.auth.OAuthLinkCallbackRequest>) {
    return axios.post<schemasRoutes.auth.OAuthLinkCallbackResponse>(
        createApiUrl(constantsRoutes.auth.oAuthLinkCallback, data.provider),
        {
            code: data.code,
            oAuthState: data.oAuthState
        },
        createAxiosConfig(data.headers)
    )
}

export function oAuthUnlink(data: RequestData<schemasRoutes.auth.OAuthUnlinkRequest>) {
    return axios.post<schemasRoutes.auth.OAuthUnlinkResponse>(
        createApiUrl(constantsRoutes.auth.oAuthUnlink, data.provider),
        {},
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
