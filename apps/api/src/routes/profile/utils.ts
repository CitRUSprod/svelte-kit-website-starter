import type { FastifyInstance } from "fastify"

import { enums } from "$/constants"
import type { UserData } from "$/types"

export async function deleteUser(app: FastifyInstance, userData: UserData) {
    await app.prisma.emailUpdateToken.deleteMany({ where: { userId: userData.id } })
    await app.prisma.passwordResetToken.deleteMany({ where: { userId: userData.id } })
    await app.prisma.ban.deleteMany({ where: { userId: userData.id } })
    await app.prisma.refreshToken.deleteMany({ where: { userId: userData.id } })

    if (userData.avatar) {
        await app.minio.removeFile(enums.ImgPath.Avatars, userData.avatar)
    }

    await app.prisma.user.delete({ where: { id: userData.id } })
}

export async function deleteExpiredEmailUpdateTokens(app: FastifyInstance) {
    await app.prisma.emailUpdateToken.deleteMany({
        where: {
            creationDate: { lt: new Date(Date.now() - enums.TokenTtl.EmailUpdate * 1000) }
        }
    })
}

export async function deleteExpiredPasswordResetTokens(app: FastifyInstance) {
    await app.prisma.passwordResetToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - enums.TokenTtl.PasswordReset * 1000) } }
    })
}
