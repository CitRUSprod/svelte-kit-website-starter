import unocss from "unocss/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import dynamicImport from "vite-plugin-dynamic-import"

/** @type {import("vite").UserConfig} */
const config = {
    server: {
        port: 6701,
        host: true
    },
    plugins: [unocss(), sveltekit(), dynamicImport()]
}

export default config
