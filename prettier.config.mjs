import prettierConfig from "@citrus-linting/prettier-config"
import svelteConfig from "@citrus-linting/prettier-config/svelte"

/** @type {import('prettier').ParserOptions} */
const config = {
    ...prettierConfig,
    ...svelteConfig
}

export default config
