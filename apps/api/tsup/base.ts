import { defineConfig } from "tsup"
import raw from "unplugin-raw/esbuild"

export default defineConfig({
    entry: ["src/main.ts"],
    format: "esm",
    platform: "node",
    clean: true,
    esbuildPlugins: [raw()]
})
