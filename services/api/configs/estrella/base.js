const path = require("path")
const { nodeExternalsPlugin } = require("esbuild-node-externals")
const { default: cleanPlugin } = require("esbuild-plugin-clean")
const typeormConfig = require("../typeorm")

/** @type {import("estrella").BuildConfig} */
const baseConfig = {
    entry: path.join(__dirname, "../../src/app.ts"),
    outfile: path.join(__dirname, "../../dist/app.js"),
    bundle: true,
    platform: "node",
    define: {
        "process.env.TYPEORM_CONFIG": JSON.stringify(JSON.stringify(typeormConfig))
    },
    plugins: [
        nodeExternalsPlugin(),
        cleanPlugin({
            patterns: ["dist/*"]
        })
    ]
}

module.exports = baseConfig
