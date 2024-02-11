// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import axios from "axios"
import { generateState } from "arctic"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import * as constantsEnums from "@local/constants/enums"
import * as schemasRoutes from "@local/schemas/routes"
import { enums, env } from "$/constants"
import { ReplyCookie, RouteHandler } from "$/types"
import { oAuthProviders } from "$/utils"
import * as utils from "./utils"

export const register = (async (app, { body }) => {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (userByEmail) throw new BadRequestError("User with such email already exists")

    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequestError("User with such username already exists")

    const password = await argon2.hash(body.password)
    await app.prisma.user.create({
        data: { email: body.email, username: body.username, password, registrationDate: new Date() }
    })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.auth.RegisterResponse,
    { body: schemasRoutes.auth.RegisterBody }
>

export const oAuthRegister = (async (app, { params, body }) => {
    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequestError("User with such username already exists")

    const oAuthRegistrationToken = await app.prisma.oAuthRegistrationToken.findFirst({
        where: { token: params.oAuthRegistrationToken }
    })
    if (!oAuthRegistrationToken) throw new BadRequestError("OAuth registration token not found")

    switch (oAuthRegistrationToken.provider) {
        case constantsEnums.OAuthProvider.Twitch: {
            await app.prisma.user.create({
                data: {
                    username: body.username,
                    twitchId: oAuthRegistrationToken.providerUserId,
                    registrationDate: new Date()
                }
            })

            break
        }

        default: {
            throw new InternalServerError("Unexpected error")
        }
    }

    await app.prisma.oAuthRegistrationToken.delete({ where: { id: oAuthRegistrationToken.id } })

    return {}
}) satisfies RouteHandler<
    schemasRoutes.auth.OAuthRegisterResponse,
    { params: schemasRoutes.auth.OAuthRegisterParams; body: schemasRoutes.auth.OAuthRegisterBody }
>

export const login = (async (app, { body }) => {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequestError("User with such email was not found")

    if (!user.password) throw new BadRequestError("Unexpected error")

    const isCorrectPassword = await argon2.verify(user.password, body.password)
    if (!isCorrectPassword) throw new BadRequestError("Incorrect password")

    await utils.deleteExpiredRefreshTokens(app)

    const tokens = utils.generateTokens(app, { id: user.id })
    await app.prisma.refreshToken.create({
        data: { token: tokens.refresh, userId: user.id, creationDate: new Date() }
    })

    return {
        cookies: [
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
}) satisfies RouteHandler<schemasRoutes.auth.LoginResponse, { body: schemasRoutes.auth.LoginBody }>

export const oAuthLogin = (async (app, { params }) => {
    const oAuthState = generateState()

    switch (_.startCase(params.provider)) {
        case constantsEnums.OAuthProvider.Twitch: {
            const url = await oAuthProviders.twitch.createAuthorizationURL(oAuthState)

            return {
                payload: {
                    redirectUrl: url.toString()
                },
                cookies: [
                    {
                        name: "oAuthState",
                        value: oAuthState,
                        options: { path: "/", httpOnly: true }
                    }
                ]
            }
        }

        default: {
            throw new InternalServerError("Unexpected error")
        }
    }
}) satisfies RouteHandler<
    schemasRoutes.auth.OAuthLoginResponse,
    { params: schemasRoutes.auth.OAuthLoginParams }
>

export const oAuthLoginCallback = (async (app, { params, cookies, body }) => {
    if (cookies.oAuthState !== body.oAuthState) throw new BadRequestError("States do not match")

    switch (_.startCase(params.provider)) {
        case constantsEnums.OAuthProvider.Twitch: {
            const twitchTokens = await oAuthProviders.twitch.validateAuthorizationCode(body.code)

            const res = await axios.get<{ data: Array<{ id: string }> }>(
                "https://api.twitch.tv/helix/users",
                {
                    headers: {
                        Authorization: `Bearer ${twitchTokens.accessToken}`,
                        "Client-Id": env.TWITCH_CLIENT_ID
                    }
                }
            )

            const twitchUser = res.data.data[0]

            const user = await app.prisma.user.findFirst({ where: { twitchId: twitchUser.id } })

            if (user) {
                await utils.deleteExpiredRefreshTokens(app)

                const tokens = utils.generateTokens(app, { id: user.id })
                await app.prisma.refreshToken.create({
                    data: { token: tokens.refresh, userId: user.id, creationDate: new Date() }
                })

                return {
                    payload: {
                        oAuthRegistrationToken: null
                    },
                    cookies: [
                        {
                            name: "oAuthState",
                            value: undefined,
                            options: { path: "/" }
                        },
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
            } else {
                await utils.deleteExpiredOAuthRegistrationTokens(app)

                const token = createUuid()

                const oAuthRegistrationToken = await app.prisma.oAuthRegistrationToken.findFirst({
                    where: {
                        provider: constantsEnums.OAuthProvider.Twitch,
                        providerUserId: twitchUser.id
                    }
                })

                if (oAuthRegistrationToken) {
                    await app.prisma.oAuthRegistrationToken.update({
                        where: { id: oAuthRegistrationToken.id },
                        data: { token, creationDate: new Date() }
                    })
                } else {
                    await app.prisma.oAuthRegistrationToken.create({
                        data: {
                            token,
                            provider: constantsEnums.OAuthProvider.Twitch,
                            providerUserId: twitchUser.id,
                            creationDate: new Date()
                        }
                    })
                }

                return {
                    payload: {
                        oAuthRegistrationToken: token
                    }
                }
            }
        }

        default: {
            throw new InternalServerError("Unexpected error")
        }
    }
}) satisfies RouteHandler<
    schemasRoutes.auth.OAuthLoginCallbackResponse,
    {
        cookies: schemasRoutes.auth.OAuthLoginCallbackCookies
        params: schemasRoutes.auth.OAuthLoginCallbackParams
        body: schemasRoutes.auth.OAuthLoginCallbackBody
    }
>

export const logout = (async (app, { cookies }) => {
    const localCookies: Array<ReplyCookie> = [
        { name: "accessToken", value: undefined, options: { path: "/" } },
        { name: "refreshToken", value: undefined, options: { path: "/" } }
    ]

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })

    if (!refreshToken) {
        utils.getPayload(app, cookies.refreshToken)

        return {
            cookies: localCookies,
            payload: new InternalServerError("Unexpected error")
        }
    }

    await app.prisma.refreshToken.delete({ where: { id: refreshToken.id } })

    return { cookies: localCookies }
}) satisfies RouteHandler<
    schemasRoutes.auth.LogoutResponse,
    { cookies: schemasRoutes.auth.LogoutCookies }
>

export const refreshTokens = (async (app, { cookies }) => {
    const payload = utils.getPayload(app, cookies.refreshToken)

    await utils.deleteExpiredRefreshTokens(app)

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) throw new InternalServerError("Refresh token not found")

    const tokens = utils.generateTokens(app, payload)
    await app.prisma.refreshToken.update({
        where: { id: refreshToken.id },
        data: { token: tokens.refresh, creationDate: new Date() }
    })

    return {
        cookies: [
            {
                name: "accessToken",
                value: tokens.access,
                options: {
                    path: "/",
                    maxAge: enums.TokenTtl.Access
                }
            },
            {
                name: "refreshToken",
                value: tokens.refresh,
                options: {
                    path: "/",
                    maxAge: enums.TokenTtl.Refresh,
                    httpOnly: true
                }
            }
        ]
    }
}) satisfies RouteHandler<
    schemasRoutes.auth.RefreshTokensResponse,
    { cookies: schemasRoutes.auth.RefreshTokensCookies }
>
