import { FastifyInstance } from "fastify"
import { TokenTtl } from "$/enums"

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
