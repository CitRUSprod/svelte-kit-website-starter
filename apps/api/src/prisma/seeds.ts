import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"
import parseArgv from "tiny-parse-argv"

const userRoleId = 1
const adminRoleId = 2

const client = new PrismaClient()
const args = parseArgv(process.argv)

function seedIs(seed: string) {
    if (!args.seed && seed === "default") {
        return true
    } else if (Array.isArray(args.seed)) {
        return args.seed.includes(seed)
    } else {
        return args.seed === seed
    }
}

client.$connect().then(async () => {
    if (seedIs("default")) {
        await client.role.createMany({
            data: [
                { id: userRoleId, name: { ru: "Пользователь", en: "User" }, protected: true },
                { id: adminRoleId, name: { ru: "Админ", en: "Admin" }, protected: true }
            ]
        })

        const password = await argon2.hash("12345678")
        await client.user.create({
            data: {
                email: "admin@example.com",
                username: "Admin",
                password,
                roleId: adminRoleId,
                registrationDate: new Date()
            }
        })
    }

    if (seedIs("test-users")) {
        const password1 = await argon2.hash("qwerty123")
        await client.user.create({
            data: {
                email: "test.user@example.com",
                username: "TestUser",
                password: password1,
                roleId: userRoleId,
                registrationDate: new Date()
            }
        })

        const password2 = await argon2.hash("qwerty321")
        await client.user.create({
            data: {
                email: "test.admin@example.com",
                username: "TestAdmin",
                password: password2,
                roleId: adminRoleId,
                registrationDate: new Date()
            }
        })
    }
})
