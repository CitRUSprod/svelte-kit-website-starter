import { z } from "zod"
import * as models from "$/models"

export function registerBody() {
    return z.object({
        email: models.user.email(),
        username: models.user.username(),
        password: models.user.password()
    })
}

export type RegisterBody = z.infer<ReturnType<typeof registerBody>>

export function loginBody() {
    return z.object({
        email: models.user.email(),
        password: models.user.password()
    })
}

export type LoginBody = z.infer<ReturnType<typeof loginBody>>

export function logoutCookies() {
    return z.object({
        refreshToken: models.refreshToken.token()
    })
}

export type LogoutCookies = z.infer<ReturnType<typeof logoutCookies>>

export function refreshTokensCookies() {
    return z.object({
        refreshToken: models.refreshToken.token()
    })
}

export type RefreshTokensCookies = z.infer<ReturnType<typeof refreshTokensCookies>>
