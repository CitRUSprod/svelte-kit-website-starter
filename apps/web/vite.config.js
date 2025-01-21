import { sveltekit } from "@sveltejs/kit/vite"
import unocss from "unocss/vite"
import dynamicImport from "vite-plugin-dynamic-import"

const isWsl = "WSL_DISTRO_NAME" in process.env

/** @type {import("vite").UserConfig} */
const config = {
    server: {
        port: 6701,
        host: !isWsl
    },
    plugins: [unocss(), sveltekit(), dynamicImport()]
}

export default config
