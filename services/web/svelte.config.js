import preprocess from "svelte-preprocess"
import adapterNode from "@sveltejs/adapter-node"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: preprocess(),
    kit: {
        adapter: adapterNode({ out: "dist" }),
        env: {
            dir: "../.."
        }
    }
}

export default config
