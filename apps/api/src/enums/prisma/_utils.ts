export function checkPrismaEnum(
    enumName: string,
    prismaEnum: Record<string, string>,
    customEnum: Record<string, string>
) {
    const error = new Error(`Custom enum "${enumName}" does not match prisma enum`)

    for (const permission of Object.values(prismaEnum)) {
        if (!(permission in customEnum)) {
            throw error
        }
    }

    for (const permission of Object.values(customEnum)) {
        if (!(permission in prismaEnum)) {
            throw error
        }
    }
}
