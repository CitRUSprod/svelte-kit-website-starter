import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const registerBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email(),
            username: schemas.models.user.username(),
            password: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type RegisterBody = Static<typeof registerBody>

export const loginBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email(),
            password: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type LoginBody = Static<typeof loginBody>

export const logoutCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: schemas.models.refreshToken.token()
        },
        { additionalProperties: false }
    )
)

export type LogoutCookies = Static<typeof logoutCookies>

export const refreshTokensCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: schemas.models.refreshToken.token()
        },
        { additionalProperties: false }
    )
)

export type RefreshTokensCookies = Static<typeof refreshTokensCookies>
