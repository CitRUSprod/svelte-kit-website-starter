/** @type {import("prettier").ParserOptions} */
const config = {
    ...require("@citrus-linting/prettier-config"),
    ...require("@citrus-linting/prettier-config/svelte")
}

module.exports = config
