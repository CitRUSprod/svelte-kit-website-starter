if (process.env.NODE_ENV !== "production") {
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
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
        directory: "../migrations"
    }
}

module.exports = config
