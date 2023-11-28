const { defu } = require("defu")
const { context } = require("esbuild")
const baseConfig = require("./base")

/** @type {import("esbuild").BuildOptions} */
const prodConfig = {
    minify: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("production")
    }
}

async function start() {
    const ctx = await context(defu(baseConfig, prodConfig))
    await ctx.rebuild()
    await ctx.dispose()
}

start()
