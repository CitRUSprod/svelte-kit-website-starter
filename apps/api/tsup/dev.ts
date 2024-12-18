import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "tsup"
import defu from "defu"
import baseConfig from "./base"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defu(
    baseConfig,
    defineConfig({
        sourcemap: "inline",
        define: {
            "process.env.NODE_ENV": JSON.stringify("development")
        },
        inject: [path.join(dirname, "dotenv.ts")]
    })
)
