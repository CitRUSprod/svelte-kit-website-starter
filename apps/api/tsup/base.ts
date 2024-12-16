import { defineConfig } from "tsup"
import raw from "esbuild-plugin-raw"

export default defineConfig({
    entry: ["src/main.ts"],
    format: "esm",
    platform: "node",
    clean: true,
    esbuildPlugins: [raw()]
})
