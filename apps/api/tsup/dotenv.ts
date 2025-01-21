import path from "node:path"
import { fileURLToPath } from "node:url"

import { config } from "dotenv"
import { expand } from "dotenv-expand"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const env = config({
    path: path.join(dirname, "../../../.env")
})

expand(env)
