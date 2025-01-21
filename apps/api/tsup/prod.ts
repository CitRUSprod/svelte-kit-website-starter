import defu from "defu"
import { defineConfig } from "tsup"

import baseConfig from "./base"

export default defu(
    baseConfig,
    defineConfig({
        minify: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify("production")
        }
    })
)
