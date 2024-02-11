import { FastifyInstance } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import * as schemasRoutes from "@local/schemas/routes"
import { enums } from "$/constants"
import { ReplyData, UserPayload } from "$/types"

interface PayloadWithTimestamps extends UserPayload {
    iat: string
    exp: string
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

export async function deleteExpiredRefreshTokens(app: FastifyInstance) {
    await app.prisma.refreshToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - enums.TokenTtl.Refresh * 1000) } }
    })
}

export async function deleteExpiredOAuthRegistrationTokens(app: FastifyInstance) {
    await app.prisma.oAuthRegistrationToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.OAuthRegistration * 1000) }
        }
    })
}

export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuth: false,
    isRegistrationHandler: true
): Promise<ReplyData<schemasRoutes.auth.RegisterResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuth: true,
    isRegistrationHandler: true
): Promise<ReplyData<schemasRoutes.auth.OAuthRegisterResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuth: false,
    isRegistrationHandler: false
): Promise<ReplyData<schemasRoutes.auth.LoginResponse>>
export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuth: true,
    isRegistrationHandler: false
): Promise<ReplyData<schemasRoutes.auth.OAuthLoginCallbackResponse>>

export async function login(
    app: FastifyInstance,
    userPayload: UserPayload,
    isOAuth: boolean,
    isRegistrationHandler: boolean
): Promise<
    ReplyData<
        | schemasRoutes.auth.RegisterResponse
        | schemasRoutes.auth.OAuthRegisterResponse
        | schemasRoutes.auth.LoginResponse
        | schemasRoutes.auth.OAuthLoginCallbackResponse
    >
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
        ...(isOAuth && !isRegistrationHandler ? { oAuthRegistrationToken: null } : {}),
        cookies: [
            ...(isOAuth ? [oAuthStateCookie] : []),
            {
                name: "accessToken",
                value: tokens.access,
                options: { path: "/", maxAge: enums.TokenTtl.Access }
            },
            {
                name: "refreshToken",
                value: tokens.refresh,
                options: { path: "/", maxAge: enums.TokenTtl.Refresh, httpOnly: true }
            }
        ]
    }
}
