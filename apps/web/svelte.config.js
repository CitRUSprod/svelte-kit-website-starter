import sequentialPreprocessor from "svelte-sequential-preprocessor"
import sveltePreprocess from "svelte-preprocess"
import { preprocessMeltUI } from "@melt-ui/pp"
import adapterNode from "@sveltejs/adapter-node"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: sequentialPreprocessor([sveltePreprocess(), preprocessMeltUI()]),
    kit: {
        adapter: adapterNode({ out: "dist" }),
        env: {
            dir: "../.."
        }
    }
}

export default config
