import { BadRequestError, InternalServerError } from "http-errors-enhanced"
import argon2 from "argon2"
import * as enums from "$/enums"
import { ReplyCookie, RouteHandler } from "$/types"
import * as common from "$/common"
import * as utils from "./utils"

export const register: RouteHandler<{ body: common.auth.RegisterBody }> = async (app, { body }) => {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (userByEmail) throw new BadRequestError("User with such email already exists")

    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequestError("User with such username already exists")

    const password = await argon2.hash(body.password)
    await app.prisma.user.create({
        data: { email: body.email, username: body.username, password, registrationDate: new Date() }
    })

    return {}
}

export const login: RouteHandler<{ body: common.auth.LoginBody }> = async (app, { body }) => {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequestError("User with such email was not found")

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
}

export const logout: RouteHandler<{ cookies: common.auth.LogoutCookies }> = async (
    app,
    { cookies }
) => {
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
}

export const refreshTokens: RouteHandler<{ cookies: common.auth.RefreshTokensCookies }> = async (
    app,
    { cookies }
) => {
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
}
