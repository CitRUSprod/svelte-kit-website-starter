const esbuild = require("esbuild")

async function build(config = {}) {
    const { dependencies } = require("../package.json")

    const baseConfig = {
        entryPoints: ["src/main.ts"],
        bundle: true,
        platform: "node",
        outdir: "dist",
        external: dependencies ? Object.keys(dependencies) : []
    }

    const timeStart = Date.now()

    try {
        await esbuild.build({ ...baseConfig, ...config })

        const timeEnd = Date.now()
        const time = timeEnd - timeStart
        console.log(`Built in ${time}ms.`)
    } catch {}
}

module.exports = { build }
