import { z } from "zod"
import * as common from "$/common"
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

// CompleteRegistration

export function completeRegistrationParams() {
    return z.object({
        registrationToken: common.token()
    })
}

export type CompleteRegistrationParams = z.infer<ReturnType<typeof completeRegistrationParams>>

export function completeRegistrationRequest() {
    return z.object({
        ...completeRegistrationParams().shape
    })
}

export type CompleteRegistrationRequest = z.infer<ReturnType<typeof completeRegistrationRequest>>

export function completeRegistrationResponse() {
    return z.void()
}

export type CompleteRegistrationResponse = z.infer<ReturnType<typeof completeRegistrationResponse>>

// OAuthRegister

export function oAuthRegisterParams() {
    return z.object({
        oAuthRegistrationToken: common.token()
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

// OAuthLogin

export function oAuthLoginParams() {
    return z.object({
        provider: models.oAuthRegistrationToken.provider$Kebab()
    })
}

export type OAuthLoginParams = z.infer<ReturnType<typeof oAuthLoginParams>>

export function oAuthLoginRequest() {
    return z.object({
        ...oAuthLoginParams().shape
    })
}

export type OAuthLoginRequest = z.infer<ReturnType<typeof oAuthLoginRequest>>

export function oAuthLoginResponse() {
    return z.object({
        redirectUrl: z.string().trim().url()
    })
}

export type OAuthLoginResponse = z.infer<ReturnType<typeof oAuthLoginResponse>>

// OAuthLoginCallback

export function oAuthLoginCallbackCookies() {
    return z.object({
        oAuthState: z.string().trim().min(1)
    })
}

export type OAuthLoginCallbackCookies = z.infer<ReturnType<typeof oAuthLoginCallbackCookies>>

export function oAuthLoginCallbackParams() {
    return z.object({
        provider: models.oAuthRegistrationToken.provider$Kebab()
    })
}

export type OAuthLoginCallbackParams = z.infer<ReturnType<typeof oAuthLoginParams>>

export function oAuthLoginCallbackBody() {
    return z.object({
        code: z.string().trim().min(1),
        oAuthState: z.string().trim().min(1)
    })
}

export type OAuthLoginCallbackBody = z.infer<ReturnType<typeof oAuthLoginCallbackBody>>

export function oAuthLoginCallbackRequest() {
    return z.object({
        ...oAuthLoginCallbackParams().shape,
        ...oAuthLoginCallbackBody().shape
    })
}

export type OAuthLoginCallbackRequest = z.infer<ReturnType<typeof oAuthLoginCallbackRequest>>

export function oAuthLoginCallbackResponse() {
    return z.object({
        oAuthRegistrationToken: common.token().nullable()
    })
}

export type OAuthLoginCallbackResponse = z.infer<ReturnType<typeof oAuthLoginCallbackResponse>>

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
