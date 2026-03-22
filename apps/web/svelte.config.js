import adapterNode from "@sveltejs/adapter-node"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapterNode({ out: "dist" }),
        alias: {
            $i18n: "src/i18n",
            $styles: "src/styles"
        },
        env: {
            dir: "../.."
        }
    }
}

export default config
