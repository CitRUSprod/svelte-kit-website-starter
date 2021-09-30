import preprocess from "svelte-preprocess"
import adapterNode from "@sveltejs/adapter-node"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: preprocess({
        postcss: true
    }),
    kit: {
        adapter: adapterNode({ out: "dist" })
    }
}

export default config
