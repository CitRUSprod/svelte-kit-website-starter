import { sveltePreprocess } from "svelte-preprocess"
import adapterNode from "@sveltejs/adapter-node"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: sveltePreprocess(),
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
