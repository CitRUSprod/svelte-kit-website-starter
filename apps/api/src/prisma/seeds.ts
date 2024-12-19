import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"

const client = new PrismaClient()

client.$connect().then(async () => {
    await client.role.createMany({
        data: [
            { name: { ru: "Пользователь", en: "User" }, protected: true },
            { name: { ru: "Админ", en: "Admin" }, protected: true }
        ]
    })

    const password = await argon2.hash("12345678")
    await client.user.create({
        data: {
            email: "admin@example.com",
            username: "Admin",
            password,
            roleId: 2,
            registrationDate: new Date()
        }
    })
})
