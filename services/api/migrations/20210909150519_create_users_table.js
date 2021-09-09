/** @type {import("knex").Knex.Migration} */
const migration = {
    async up(knex) {
        await knex.schema.createTable("users", table => {
            table.increments("id").primary()
            table.string("email").unique()
            table.string("username").unique()
            table.string("password")
        })
    },
    async down(knex) {
        await knex.schema.dropTable("users")
    }
}

module.exports = migration
