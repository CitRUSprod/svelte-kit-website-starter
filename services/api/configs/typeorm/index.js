if (process.env.POSTGRES_USER === undefined) {
    const path = require("path")
    const dotenv = require("dotenv")

    dotenv.config({
        path: path.join(__dirname, "../../../../.env")
    })
}

/** @type {import("typeorm").ConnectionOptions} */
const config = {
    type: "postgres",
    host: process.env.POSTGRES_HOST ?? "localhost",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ["src/db/entities/*.ts"],
    migrations: ["src/db/migrations/*.ts"],
    cli: {
        entitiesDir: "src/db/entities",
        migrationsDir: "src/db/migrations"
    }
}

module.exports = config
