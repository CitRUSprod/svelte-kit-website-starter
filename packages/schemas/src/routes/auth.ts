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
