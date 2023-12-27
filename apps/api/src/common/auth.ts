import { z } from "zod"
import * as schemas from "$/schemas"

export const basePath = "/auth"

export const registerPath = "/register"

export function registerBodySchema() {
    return z.object({
        email: schemas.models.user.email(),
        username: schemas.models.user.username(),
        password: schemas.models.user.password()
    })
}

export type RegisterBody = z.infer<ReturnType<typeof registerBodySchema>>

export const loginPath = "/login"

export function loginBodySchema() {
    return z.object({
        email: schemas.models.user.email(),
        password: schemas.models.user.password()
    })
}

export type LoginBody = z.infer<ReturnType<typeof loginBodySchema>>

export const logoutPath = "/logout"

export function logoutCookiesSchema() {
    return z.object({
        refreshToken: schemas.models.refreshToken.token()
    })
}

export type LogoutCookies = z.infer<ReturnType<typeof logoutCookiesSchema>>

export const refreshPath = "/refresh"

export function refreshTokensCookiesSchema() {
    return z.object({
        refreshToken: schemas.models.refreshToken.token()
    })
}

export type RefreshTokensCookies = z.infer<ReturnType<typeof refreshTokensCookiesSchema>>
