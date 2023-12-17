import { z } from "zod"
import * as schemas from "$/schemas"

export const registerBody = z.object({
    email: schemas.models.user.email(),
    username: schemas.models.user.username(),
    password: schemas.models.user.password()
})

export type RegisterBody = z.infer<typeof registerBody>

export const loginBody = z.object({
    email: schemas.models.user.email(),
    password: schemas.models.user.password()
})

export type LoginBody = z.infer<typeof loginBody>

export const logoutCookies = z.object({
    refreshToken: schemas.models.refreshToken.token()
})

export type LogoutCookies = z.infer<typeof logoutCookies>

export const refreshTokensCookies = z.object({
    refreshToken: schemas.models.refreshToken.token()
})

export type RefreshTokensCookies = z.infer<typeof refreshTokensCookies>
