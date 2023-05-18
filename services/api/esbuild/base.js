const path = require("path")
const { nodeExternals } = require("esbuild-plugin-node-externals")
const { clean } = require("esbuild-plugin-clean")
const { esbuildPluginDecorator } = require("esbuild-plugin-decorator")

/** @type {import("esbuild").BuildOptions} */
const baseConfig = {
    entryPoints: ["src/main.ts"],
    bundle: true,
    platform: "node",
    outfile: "dist/main.js",
    inject: [path.join(__dirname, "dotenv.js")],
    plugins: [nodeExternals(), clean({ patterns: ["dist/*"] }), esbuildPluginDecorator()]
}

module.exports = baseConfig
