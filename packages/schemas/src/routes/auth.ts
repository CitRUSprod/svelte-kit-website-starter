import { z } from "zod"
import * as models from "$/models"

// Register

export function registerBody() {
    return z.object({
        email: models.user.email(),
        username: models.user.username(),
        password: models.user.password()
    })
}

export type RegisterBody = z.infer<ReturnType<typeof registerBody>>

export function registerRequest() {
    return z.object({
        ...registerBody().shape
    })
}

export type RegisterRequest = z.infer<ReturnType<typeof registerRequest>>

export function registerResponse() {
    return z.void()
}

export type RegisterResponse = z.infer<ReturnType<typeof registerResponse>>

// OAuthRegister

export function oAuthRegisterParams() {
    return z.object({
        oAuthRegistrationToken: models.oAuthRegistrationToken.token()
    })
}

export type OAuthRegisterParams = z.infer<ReturnType<typeof oAuthRegisterParams>>

export function oAuthRegisterBody() {
    return z.object({
        username: models.user.username()
    })
}

export type OAuthRegisterBody = z.infer<ReturnType<typeof oAuthRegisterBody>>

export function oAuthRegisterRequest() {
    return z.object({
        ...oAuthRegisterParams().shape,
        ...oAuthRegisterBody().shape
    })
}

export type OAuthRegisterRequest = z.infer<ReturnType<typeof oAuthRegisterRequest>>

export function oAuthRegisterResponse() {
    return z.void()
}

export type OAuthRegisterResponse = z.infer<ReturnType<typeof oAuthRegisterResponse>>

// Login

export function loginBody() {
    return z.object({
        email: models.user.email(),
        password: models.user.password()
    })
}

export type LoginBody = z.infer<ReturnType<typeof loginBody>>

export function loginRequest() {
    return z.object({
        ...loginBody().shape
    })
}

export type LoginRequest = z.infer<ReturnType<typeof loginRequest>>

export function loginResponse() {
    return z.void()
}

export type LoginResponse = z.infer<ReturnType<typeof loginResponse>>

// LoginWithTwitch

export function loginWithTwitchRequest() {
    return z.void()
}

export type LoginWithTwitchRequest = z.infer<ReturnType<typeof loginWithTwitchRequest>>

export function loginWithTwitchResponse() {
    return z.object({
        redirectUrl: z.string().trim().min(1)
    })
}

export type LoginWithTwitchResponse = z.infer<ReturnType<typeof loginWithTwitchResponse>>

// LoginWithTwitchCallback

export function loginWithTwitchCallbackCookies() {
    return z.object({
        twitchOAuthState: z.string().trim().min(1)
    })
}

export type LoginWithTwitchCallbackCookies = z.infer<
    ReturnType<typeof loginWithTwitchCallbackCookies>
>

export function loginWithTwitchCallbackBody() {
    return z.object({
        code: z.string().trim().min(1),
        state: z.string().trim().min(1)
    })
}

export type LoginWithTwitchCallbackBody = z.infer<ReturnType<typeof loginWithTwitchCallbackBody>>

export function loginWithTwitchCallbackRequest() {
    return z.object({
        ...loginWithTwitchCallbackBody().shape
    })
}

export type LoginWithTwitchCallbackRequest = z.infer<
    ReturnType<typeof loginWithTwitchCallbackRequest>
>

export function loginWithTwitchCallbackResponse() {
    return z.object({
        oAuthRegistrationToken: models.oAuthRegistrationToken.token().nullable()
    })
}

export type LoginWithTwitchCallbackResponse = z.infer<
    ReturnType<typeof loginWithTwitchCallbackResponse>
>

// Logout

export function logoutCookies() {
    return z.object({
        refreshToken: models.refreshToken.token()
    })
}

export type LogoutCookies = z.infer<ReturnType<typeof logoutCookies>>

export function logoutRequest() {
    return z.void()
}

export type LogoutRequest = z.infer<ReturnType<typeof logoutRequest>>

export function logoutResponse() {
    return z.void()
}

export type LogoutResponse = z.infer<ReturnType<typeof logoutResponse>>

// RefreshTokens

export function refreshTokensCookies() {
    return z.object({
        refreshToken: models.refreshToken.token()
    })
}

export type RefreshTokensCookies = z.infer<ReturnType<typeof refreshTokensCookies>>

export function refreshTokensRequest() {
    return z.void()
}

export type RefreshTokensRequest = z.infer<ReturnType<typeof refreshTokensRequest>>

export function refreshTokensResponse() {
    return z.void()
}

export type RefreshTokensResponse = z.infer<ReturnType<typeof refreshTokensResponse>>
