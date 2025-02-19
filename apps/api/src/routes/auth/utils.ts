import * as schemasRoutes from "@repo/schemas/routes"
import type { FastifyInstance } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"

import { enums } from "$/constants"
import type { ReplyCookie, ReplyData, UserPayload } from "$/types"

interface PayloadWithTimestamps extends UserPayload {
    iat: string
    exp: string
}

export function getLogoutCookies() {
    const cookies: Array<ReplyCookie> = [
        { name: "accessToken", value: undefined, options: { path: "/" } },
        { name: "refreshToken", value: undefined, options: { path: "/" } }
    ]
    return cookies
}

export function generateTokens(app: FastifyInstance, userPayload: UserPayload) {
    const access = app.jwt.sign(userPayload, { expiresIn: enums.TokenTtl.Access })
    const refresh = app.jwt.sign(userPayload, { expiresIn: enums.TokenTtl.Refresh })
    return { access, refresh }
}

export function getPayload(app: FastifyInstance, token: string): UserPayload {
    try {
        const { iat, exp, ...payload } = app.jwt.verify<PayloadWithTimestamps>(token)
        return payload
    } catch (err: any) {
        throw new UnauthorizedError(err.message)
    }
}

export async function deleteExpiredRegistrationTokens(app: FastifyInstance) {
    await app.prisma.registrationToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.Registration * 1000) }
        }
    })
}

export async function deleteExpiredOAuthRegistrationTokens(app: FastifyInstance) {
    await app.prisma.oAuthRegistrationToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.OAuthRegistration * 1000) }
        }
    })
}

export async function deleteExpiredLinkingTokens(app: FastifyInstance) {
    await app.prisma.linkingToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.Linking * 1000) }
        }
    })
}

export async function deleteExpiredUnlinkingTokens(app: FastifyInstance) {
    await app.prisma.unlinkingToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.Unlinking * 1000) }
        }
    })
}

export async function deleteExpiredRefreshTokens(app: FastifyInstance) {
    await app.prisma.refreshToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - enums.TokenTtl.Refresh * 1000) } }
    })
}

export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuthHandler: false,
    isRegistrationHandler: true
): Promise<ReplyData<schemasRoutes.auth.RegisterResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuthHandler: true,
    isRegistrationHandler: true
): Promise<ReplyData<schemasRoutes.auth.OAuthRegisterResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuthHandler: false,
    isRegistrationHandler: false
): Promise<ReplyData<schemasRoutes.auth.LoginResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuthHandler: true,
    isRegistrationHandler: false
): Promise<ReplyData<schemasRoutes.auth.OAuthLoginCallbackResponse>>

export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuthHandler: boolean,
    isRegistrationHandler: boolean
): Promise<
    ReplyData<schemasRoutes.auth.RegisterResponse | schemasRoutes.auth.OAuthLoginCallbackResponse>
> {
    await deleteExpiredRefreshTokens(app)

    const tokens = generateTokens(app, userPayload)
    await app.prisma.refreshToken.create({
        data: { token: tokens.refresh, userId: userPayload.id, creationDate: new Date() }
    })

    const oAuthStateCookie = {
        name: "oAuthState",
        value: undefined,
        options: { path: "/" }
    }

    return {
        ...(isOAuthHandler && !isRegistrationHandler ? { oAuthRegistrationToken: null } : {}),
        cookies: [
            ...(isOAuthHandler ? [oAuthStateCookie] : []),
            {
                name: "accessToken",
                value: tokens.access,
                options: {
                    path: "/",
                    maxAge: enums.TokenTtl.Access,
                    sameSite: "lax"
                }
            },
            {
                name: "refreshToken",
                value: tokens.refresh,
                options: {
                    path: "/",
                    maxAge: enums.TokenTtl.Refresh,
                    sameSite: "lax",
                    httpOnly: true
                }
            }
        ]
    }
}
