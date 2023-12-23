import { FastifyInstance } from "fastify"
import { UnauthorizedError } from "http-errors-enhanced"
import * as enums from "$/enums"
import { UserPayload } from "$/types"

interface PayloadWithTimestamps extends UserPayload {
    iat: string
    exp: string
}

export function generateTokens(app: FastifyInstance, payload: UserPayload) {
    const access = app.jwt.sign(payload, { expiresIn: enums.TokenTtl.Access })
    const refresh = app.jwt.sign(payload, { expiresIn: enums.TokenTtl.Refresh })
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
