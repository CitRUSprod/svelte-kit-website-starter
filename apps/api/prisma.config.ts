import { defineConfig, env } from "prisma/config"

export default defineConfig({
    schema: "src/prisma/schema.prisma",
    migrations: {
        path: "src/prisma/migrations",
        seed: "tsx src/prisma/seeds.ts"
    },
    datasource: {
        url: env("POSTGRES_URL")
    }
})
