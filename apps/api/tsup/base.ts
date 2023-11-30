import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/main.ts"],
    format: "esm",
    platform: "node",
    clean: true
})
