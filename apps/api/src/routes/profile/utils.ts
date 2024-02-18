import { FastifyInstance } from "fastify"
import { enums } from "$/constants"

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
