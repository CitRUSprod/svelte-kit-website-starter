import { knex } from "knex"

const db = knex(JSON.parse(process.env.KNEX_CONFIG!))

export default db
