import mongoose from "mongoose"
import * as allModels from "./models"

interface Options {
    host: string
    port: number
    username: string
    password: string
    dbName: string
}

namespace Database {
    export const models = allModels

    export function connect({ host, port, username, password, dbName }: Options) {
        return mongoose.connect(
            `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    }

    export function close() {
        return mongoose.connection.close()
    }
}

export default Database
