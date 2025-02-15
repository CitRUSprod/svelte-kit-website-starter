import { z } from "@local/utils"

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

export type OAuthLoginCallbackParams = z.infer<ReturnType<typeof oAuthLoginCallbackParams>>

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

// Link

export function linkBody() {
    return z.object({
        email: models.user.email(),
        password: models.user.password()
    })
}

export type LinkBody = z.infer<ReturnType<typeof linkBody>>

export function linkRequest() {
    return z.object({
        ...linkBody().shape
    })
}

export type LinkRequest = z.infer<ReturnType<typeof linkRequest>>

export function linkResponse() {
    return z.void()
}

export type LinkResponse = z.infer<ReturnType<typeof linkResponse>>

// CompleteLinking

export function completeLinkingParams() {
    return z.object({
        linkingToken: common.token()
    })
}

export type CompleteLinkingParams = z.infer<ReturnType<typeof completeLinkingParams>>

export function completeLinkingRequest() {
    return z.object({
        ...completeLinkingParams().shape
    })
}

export type CompleteLinkingRequest = z.infer<ReturnType<typeof completeLinkingRequest>>

export function completeLinkingResponse() {
    return z.void()
}

export type CompleteLinkingResponse = z.infer<ReturnType<typeof completeLinkingResponse>>

// Unlink

export function unlinkRequest() {
    return z.void()
}

export type UnlinkRequest = z.infer<ReturnType<typeof unlinkRequest>>

export function unlinkResponse() {
    return z.void()
}

export type UnlinkResponse = z.infer<ReturnType<typeof unlinkResponse>>

// CompleteUnlinking

export function completeUnlinkingParams() {
    return z.object({
        unlinkingToken: common.token()
    })
}

export type CompleteUnlinkingParams = z.infer<ReturnType<typeof completeUnlinkingParams>>

export function completeUnlinkingRequest() {
    return z.object({
        ...completeUnlinkingParams().shape
    })
}

export type CompleteUnlinkingRequest = z.infer<ReturnType<typeof completeUnlinkingRequest>>

export function completeUnlinkingResponse() {
    return z.void()
}

export type CompleteUnlinkingResponse = z.infer<ReturnType<typeof completeUnlinkingResponse>>

// OAuthLinkCallback

export function oAuthLinkCallbackCookies() {
    return z.object({
        oAuthState: z.string().trim().min(1)
    })
}

export type OAuthLinkCallbackCookies = z.infer<ReturnType<typeof oAuthLinkCallbackCookies>>

export function oAuthLinkCallbackParams() {
    return z.object({
        provider: models.oAuthRegistrationToken.provider$Kebab()
    })
}

export type OAuthLinkCallbackParams = z.infer<ReturnType<typeof oAuthLinkCallbackParams>>

export function oAuthLinkCallbackBody() {
    return z.object({
        code: z.string().trim().min(1),
        oAuthState: z.string().trim().min(1)
    })
}

export type OAuthLinkCallbackBody = z.infer<ReturnType<typeof oAuthLinkCallbackBody>>

export function oAuthLinkCallbackRequest() {
    return z.object({
        ...oAuthLinkCallbackParams().shape,
        ...oAuthLinkCallbackBody().shape
    })
}

export type OAuthLinkCallbackRequest = z.infer<ReturnType<typeof oAuthLinkCallbackRequest>>

export function oAuthLinkCallbackResponse() {
    return z.void()
}

export type OAuthLinkCallbackResponse = z.infer<ReturnType<typeof oAuthLinkCallbackResponse>>

// OAuthUnlink

export function oAuthUnlinkParams() {
    return z.object({
        provider: models.oAuthRegistrationToken.provider$Kebab()
    })
}

export type OAuthUnlinkParams = z.infer<ReturnType<typeof oAuthUnlinkParams>>

export function oAuthUnlinkRequest() {
    return z.object({
        ...oAuthUnlinkParams().shape
    })
}

export type OAuthUnlinkRequest = z.infer<ReturnType<typeof oAuthUnlinkRequest>>

export function oAuthUnlinkResponse() {
    return z.object({
        ...models.user.user().shape
    })
}

export type OAuthUnlinkResponse = z.infer<ReturnType<typeof oAuthUnlinkResponse>>

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
