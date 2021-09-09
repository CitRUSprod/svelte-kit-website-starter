if (process.env.POSTGRES_USER === undefined) {
    const path = require("path")
    const dotenv = require("dotenv")

    dotenv.config({
        path: path.join(__dirname, "../../../../.env")
    })
}

/** @type {import("knex").Knex.Config} */
const config = {
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST ?? "localhost",
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    },
    migrations: {
        directory: "../migrations"
    }
}

module.exports = config
