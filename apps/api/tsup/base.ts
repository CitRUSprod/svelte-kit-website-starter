import raw from "esbuild-plugin-raw"
import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/main.ts"],
    format: "esm",
    platform: "node",
    clean: true,
    esbuildPlugins: [raw()]
})
