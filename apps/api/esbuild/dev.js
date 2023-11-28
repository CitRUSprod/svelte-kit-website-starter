const path = require("path")
const { defu } = require("defu")
const { context } = require("esbuild")
const { run } = require("esbuild-plugin-run")
const baseConfig = require("./base")

/** @type {import("esbuild").BuildOptions} */
const devConfig = {
    sourcemap: "inline",
    define: {
        "process.env.NODE_ENV": JSON.stringify("development")
    },
    plugins: [run()],
    inject: [path.join(__dirname, "sourcemaps.js")]
}

async function start() {
    const ctx = await context(defu(baseConfig, devConfig))
    await ctx.watch()
}

start()
