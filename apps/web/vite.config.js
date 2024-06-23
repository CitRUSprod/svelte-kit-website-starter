import unocss from "unocss/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import dynamicImport from "vite-plugin-dynamic-import"
import { HstSvelte as hstSvelte } from "@histoire/plugin-svelte"

const isWsl = "WSL_DISTRO_NAME" in process.env

/** @type {import("vite").UserConfig} */
const config = {
    server: {
        port: 6701,
        host: !isWsl
    },
    plugins: [unocss(), sveltekit(), dynamicImport()],
    histoire: {
        plugins: [hstSvelte()],
        setupFile: "histoire.setup.js"
    }
}

export default config
