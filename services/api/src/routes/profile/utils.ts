import path from "path"
import fs from "fs-extra"
import { FastifyInstance } from "fastify"
import { TokenTtl } from "$/enums"

const dirPath = path.join(__dirname, "../storage/images/avatars")

export async function deleteAvatar(avatar: string) {
    await fs.remove(`${dirPath}/${avatar}`)
}

export async function deleteExpiredEmailConfirmationTokens(app: FastifyInstance) {
    await app.prisma.emailConfirmationToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.EmailConfirmation * 1000) } }
    })
}

export async function deleteExpiredPasswordResetTokens(app: FastifyInstance) {
    await app.prisma.passwordResetToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.PasswordReset * 1000) } }
    })
}
