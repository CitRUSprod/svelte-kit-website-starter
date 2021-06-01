const path = require("path")
const dotenv = require("dotenv")
const { build } = require("./base")

const { parsed: parsedEnv } = dotenv.config({
    path: path.join(__dirname, "../../../.env")
})

function createProcessEnv(env) {
    if (env) {
        const result = {}

        for (const [key, value] of Object.entries(env)) {
            result[`process.env.${key}`] = JSON.stringify(value)
        }

        return result
    } else {
        return {}
    }
}

const devConfig = {
    sourcemap: "inline",
    define: {
        ...createProcessEnv(parsedEnv),
        "process.env.NODE_ENV": JSON.stringify("development")
    },
    inject: [path.join(__dirname, "sourcemaps.js")]
}

build(devConfig)
