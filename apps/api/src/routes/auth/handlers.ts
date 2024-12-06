// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import axios from "axios"
import { generateState } from "arctic"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import type { User } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"
import * as schemasRoutes from "@local/schemas/routes"
import { enums, env } from "$/constants"
import type { RouteHandler, UserPayload } from "$/types"
import { oAuthProviders, sendEmail, models } from "$/utils"
import * as utils from "./utils"

export const register = (async (app, req) => {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: req.body.email } })
    if (userByEmail) {
        throw new BadRequestError(req.ll.userWithSuchEmailAlreadyExists())
    }

    const userByUsername = await app.prisma.user.findFirst({
        where: { username: { contains: req.body.username, mode: "insensitive" } }
    })
    if (userByUsername) {
        throw new BadRequestError(req.ll.userWithSuchUsernameAlreadyExists())
    }

    await utils.deleteExpiredRegistrationTokens(app)

    const registrationTokenByEmail = await app.prisma.registrationToken.findFirst({
        where: { email: req.body.email }
    })

    if (registrationTokenByEmail) {
        throw new BadRequestError(req.ll.emailAlreadySent())
    }

    const registrationTokenByUsername = await app.prisma.registrationToken.findFirst({
        where: { username: req.body.username }
    })

    if (registrationTokenByUsername) {
        throw new BadRequestError(req.ll.userWithSuchUsernameAlreadyExists())
    }

    const password = await argon2.hash(req.body.password)
    const token = createUuid()

    await app.prisma.registrationToken.create({
        data: {
            token,
            email: req.body.email,
            username: req.body.username,
            password,
            creationDate: new Date()
        }
    })

    const url = new URL(`/auth/registration/complete/${token}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.registration()
    const message = `
        <div>
            <h3>${req.ll.dear()} ${req.body.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.completeRegistration()}</a>
        </div>
    `
    await sendEmail(req.body.email, subject, message)

    return {}
}) satisfies RouteHandler<
    { Body: schemasRoutes.auth.RegisterBody },
    schemasRoutes.auth.RegisterResponse
>

export const completeRegistration = (async (app, req) => {
    await utils.deleteExpiredRegistrationTokens(app)

    const registrationToken = await app.prisma.registrationToken.findFirst({
        where: { token: req.params.registrationToken }
    })
    if (!registrationToken) {
        throw new BadRequestError(req.ll.registrationTokenExpired())
    }

    const user = await app.prisma.user.create({
        data: {
            email: registrationToken.email,
            username: registrationToken.username,
            password: registrationToken.password,
            registrationDate: new Date()
        }
    })

    await app.prisma.registrationToken.delete({ where: { id: registrationToken.id } })

    return utils.login(app, { id: user.id }, false, true)
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.CompleteRegistrationParams },
    schemasRoutes.auth.CompleteRegistrationResponse
>

export const oAuthRegister = (async (app, req) => {
    const userByUsername = await app.prisma.user.findFirst({
        where: { username: { contains: req.body.username, mode: "insensitive" } }
    })
    if (userByUsername) {
        throw new BadRequestError(req.ll.userWithSuchUsernameAlreadyExists())
    }

    const oAuthRegistrationToken = await app.prisma.oAuthRegistrationToken.findFirst({
        where: { token: req.params.oAuthRegistrationToken }
    })

    if (!oAuthRegistrationToken) {
        throw new BadRequestError(req.ll.oAuthRegistrationTokenNotFound())
    }

    let user: User

    switch (oAuthRegistrationToken.provider) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison, @typescript-eslint/no-unnecessary-condition
        case constantsEnums.OAuthProvider.Twitch: {
            user = await app.prisma.user.create({
                data: {
                    username: req.body.username,
                    twitchId: oAuthRegistrationToken.providerUserId,
                    registrationDate: new Date()
                }
            })

            break
        }

        default: {
            throw new InternalServerError(req.ll.unexpectedError())
        }
    }

    await app.prisma.oAuthRegistrationToken.delete({ where: { id: oAuthRegistrationToken.id } })

    return utils.login(app, { id: user.id }, true, true)
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.OAuthRegisterParams; Body: schemasRoutes.auth.OAuthRegisterBody },
    schemasRoutes.auth.OAuthRegisterResponse
>

export const login = (async (app, req) => {
    const user = await app.prisma.user.findFirst({ where: { email: req.body.email } })
    if (!user) {
        throw new BadRequestError(req.ll.userWithEmailNotFound())
    }

    if (!user.password) {
        throw new BadRequestError(req.ll.unexpectedError())
    }

    const isCorrectPassword = await argon2.verify(user.password, req.body.password)
    if (!isCorrectPassword) {
        throw new BadRequestError(req.ll.incorrectPassword())
    }

    return utils.login(app, { id: user.id }, false, false)
}) satisfies RouteHandler<{ Body: schemasRoutes.auth.LoginBody }, schemasRoutes.auth.LoginResponse>

export const oAuthLogin = (async (app, req) => {
    const oAuthState = generateState()

    switch (_.upperFirst(_.camelCase(req.params.provider))) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case constantsEnums.OAuthProvider.Twitch: {
            const url = oAuthProviders.twitch.createAuthorizationURL(oAuthState, [])

            return {
                payload: {
                    redirectUrl: url.toString()
                },
                cookies: [
                    {
                        name: "oAuthState",
                        value: oAuthState,
                        options: {
                            path: "/",
                            sameSite: "lax",
                            httpOnly: true
                        }
                    }
                ]
            }
        }

        default: {
            throw new InternalServerError(req.ll.unexpectedError())
        }
    }
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.OAuthLoginParams },
    schemasRoutes.auth.OAuthLoginResponse
>

export const oAuthLoginCallback = (async (app, req, cookies) => {
    if (cookies.oAuthState !== req.body.oAuthState) {
        throw new BadRequestError(req.ll.statesDoNotMatch())
    }

    switch (_.upperFirst(_.camelCase(req.params.provider))) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case constantsEnums.OAuthProvider.Twitch: {
            const twitchTokens = await oAuthProviders.twitch.validateAuthorizationCode(
                req.body.code
            )

            const res = await axios.get<{ data: Array<{ id: string }> }>(
                "https://api.twitch.tv/helix/users",
                {
                    headers: {
                        Authorization: `Bearer ${twitchTokens.accessToken()}`,
                        "Client-Id": env.TWITCH_CLIENT_ID
                    }
                }
            )

            const twitchUser = res.data.data[0]

            const user = await app.prisma.user.findFirst({ where: { twitchId: twitchUser.id } })

            if (user) {
                return utils.login(app, { id: user.id }, true, false)
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
            throw new InternalServerError(req.ll.unexpectedError())
        }
    }
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.auth.OAuthLoginCallbackParams
        Body: schemasRoutes.auth.OAuthLoginCallbackBody
    },
    schemasRoutes.auth.OAuthLoginCallbackResponse,
    schemasRoutes.auth.OAuthLoginCallbackCookies
>

export const link = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }
    if (req.userData.email) {
        throw new BadRequestError(req.ll.youAlreadyHaveEmail())
    }

    const userByEmail = await app.prisma.user.findFirst({ where: { email: req.body.email } })
    if (userByEmail) {
        throw new BadRequestError(req.ll.userWithSuchEmailAlreadyExists())
    }

    await utils.deleteExpiredLinkingTokens(app)

    const linkingTokenByEmail = await app.prisma.linkingToken.findFirst({
        where: { email: req.body.email }
    })

    if (linkingTokenByEmail) {
        throw new BadRequestError(req.ll.emailAlreadySent())
    }

    const password = await argon2.hash(req.body.password)
    const token = createUuid()

    await app.prisma.linkingToken.create({
        data: {
            token,
            email: req.body.email,
            password,
            userId: req.userData.id,
            creationDate: new Date()
        }
    })

    const url = new URL(`/auth/link/complete/${token}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.emailLinking()
    const message = `
        <div>
            <h3>${req.ll.dear()} ${req.userData.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.linkEmail()}</a>
        </div>
    `
    await sendEmail(req.body.email, subject, message)

    return {}
}) satisfies RouteHandler<{ Body: schemasRoutes.auth.LinkBody }, schemasRoutes.auth.LinkResponse>

export const completeLinking = (async (app, req) => {
    await utils.deleteExpiredLinkingTokens(app)

    const linkingToken = await app.prisma.linkingToken.findFirst({
        where: { token: req.params.linkingToken }
    })
    if (!linkingToken) {
        throw new BadRequestError(req.ll.linkingTokenExpired())
    }

    await app.prisma.user.update({
        where: { id: linkingToken.userId },
        data: {
            email: linkingToken.email,
            password: linkingToken.password
        }
    })

    await app.prisma.linkingToken.delete({ where: { id: linkingToken.id } })

    return {}
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.CompleteLinkingParams },
    schemasRoutes.auth.CompleteLinkingResponse
>

export const unlink = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }
    if (!req.userData.email) {
        throw new BadRequestError(req.ll.emailIsNotSet())
    }

    await utils.deleteExpiredUnlinkingTokens(app)

    const unlinkingTokenByEmail = await app.prisma.unlinkingToken.findFirst({
        where: { userId: req.userData.id }
    })

    if (unlinkingTokenByEmail) {
        throw new BadRequestError(req.ll.emailAlreadySent())
    }

    const token = createUuid()

    await app.prisma.unlinkingToken.create({
        data: {
            token,
            userId: req.userData.id,
            creationDate: new Date()
        }
    })

    const url = new URL(`/auth/unlink/complete/${token}`, env.PUBLIC_BASE_URL).toString()
    const subject = req.ll.emailUnlinking()
    const message = `
        <div>
            <h3>${req.ll.dear()} ${req.userData.username}</h3>
        </div>
        <div>
            <a href="${url}">${req.ll.unlinkEmail()}</a>
        </div>
    `
    await sendEmail(req.userData.email, subject, message)

    return {}
}) satisfies RouteHandler<void, schemasRoutes.auth.UnlinkResponse>

export const completeUnlinking = (async (app, req) => {
    await utils.deleteExpiredUnlinkingTokens(app)

    const unlinkingToken = await app.prisma.unlinkingToken.findFirst({
        where: { token: req.params.unlinkingToken }
    })
    if (!unlinkingToken) {
        throw new BadRequestError(req.ll.unlinkingTokenExpired())
    }

    const user = await app.prisma.user.findUnique({
        where: { id: unlinkingToken.userId }
    })
    if (!user) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (user.email !== null && user.twitchId === null) {
        throw new BadRequestError(req.ll.cannotUnlinkLastAuthMethod())
    }

    await app.prisma.user.update({
        where: { id: unlinkingToken.userId },
        data: {
            email: null,
            password: null
        }
    })

    await app.prisma.unlinkingToken.delete({ where: { id: unlinkingToken.id } })

    return {}
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.CompleteUnlinkingParams },
    schemasRoutes.auth.CompleteUnlinkingResponse
>

export const oAuthLinkCallback = (async (app, req, cookies) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    if (cookies.oAuthState !== req.body.oAuthState) {
        throw new BadRequestError(req.ll.statesDoNotMatch())
    }

    switch (_.upperFirst(_.camelCase(req.params.provider))) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case constantsEnums.OAuthProvider.Twitch: {
            if (req.userData.twitchId !== null) {
                throw new InternalServerError(
                    req.ll.youAlreadyHaveAccount({ provider: constantsEnums.OAuthProvider.Twitch })
                )
            }

            const twitchTokens = await oAuthProviders.twitch.validateAuthorizationCode(
                req.body.code
            )

            const res = await axios.get<{ data: Array<{ id: string }> }>(
                "https://api.twitch.tv/helix/users",
                {
                    headers: {
                        Authorization: `Bearer ${twitchTokens.accessToken()}`,
                        "Client-Id": env.TWITCH_CLIENT_ID
                    }
                }
            )

            const twitchUser = res.data.data[0]

            const user = await app.prisma.user.findFirst({ where: { twitchId: twitchUser.id } })

            const oAuthStateCookie = {
                name: "oAuthState",
                value: undefined,
                options: { path: "/" }
            }

            if (user) {
                return {
                    cookies: [oAuthStateCookie],
                    payload: new BadRequestError(
                        req.ll.accountAlreadyLinked({
                            provider: constantsEnums.OAuthProvider.Twitch
                        })
                    )
                }
            } else {
                await app.prisma.user.update({
                    where: { id: req.userData.id },
                    data: {
                        twitchId: twitchUser.id
                    }
                })

                return {
                    cookies: [oAuthStateCookie]
                }
            }
        }

        default: {
            throw new InternalServerError(req.ll.unexpectedError())
        }
    }
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.auth.OAuthLinkCallbackParams
        Body: schemasRoutes.auth.OAuthLinkCallbackBody
    },
    schemasRoutes.auth.OAuthLinkCallbackResponse,
    schemasRoutes.auth.OAuthLinkCallbackCookies
>

export const oAuthUnlink = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    switch (_.upperFirst(_.camelCase(req.params.provider))) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case constantsEnums.OAuthProvider.Twitch: {
            if (req.userData.twitchId === null) {
                throw new BadRequestError(
                    req.ll.youDoNotHaveAccount({ provider: constantsEnums.OAuthProvider.Twitch })
                )
            }

            const user = await app.prisma.user.findUnique({
                where: { id: req.userData.id }
            })

            if (!user) {
                throw new InternalServerError(req.ll.unexpectedError())
            }

            if (user.email === null && user.twitchId !== null) {
                throw new BadRequestError(req.ll.cannotUnlinkLastAuthMethod())
            }

            const updatedUser = await app.prisma.user.update({
                where: { id: req.userData.id },
                data: {
                    twitchId: null
                },
                include: { role: true, ban: { include: { author: true } } }
            })

            return { payload: models.user.dto(updatedUser) }
        }

        default: {
            throw new InternalServerError(req.ll.unexpectedError())
        }
    }
}) satisfies RouteHandler<
    { Params: schemasRoutes.auth.OAuthUnlinkParams },
    schemasRoutes.auth.OAuthUnlinkResponse
>

export const logout = (async (app, req, cookies) => {
    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })

    if (!refreshToken) {
        try {
            utils.getPayload(app, cookies.refreshToken)
        } catch (err: any) {
            return {
                cookies: utils.getLogoutCookies(),
                payload: err
            }
        }

        return {
            cookies: utils.getLogoutCookies(),
            payload: new InternalServerError(req.ll.unexpectedError())
        }
    }

    await app.prisma.refreshToken.delete({ where: { id: refreshToken.id } })

    return { cookies: utils.getLogoutCookies() }
}) satisfies RouteHandler<void, schemasRoutes.auth.LogoutResponse, schemasRoutes.auth.LogoutCookies>

export const refreshTokens = (async (app, req, cookies) => {
    let payload: UserPayload

    try {
        payload = utils.getPayload(app, cookies.refreshToken)
    } catch (err: any) {
        return {
            cookies: utils.getLogoutCookies(),
            payload: err
        }
    }

    await utils.deleteExpiredRefreshTokens(app)

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) {
        throw new InternalServerError(req.ll.refreshTokenNotFound())
    }

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
}) satisfies RouteHandler<
    void,
    schemasRoutes.auth.RefreshTokensResponse,
    schemasRoutes.auth.RefreshTokensCookies
>
