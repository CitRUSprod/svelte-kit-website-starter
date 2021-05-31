module.exports = {
    ...require("@citrus-linting/prettier-config"),
    ...require("@citrus-linting/prettier-config/svelte"),
    plugins: ["./node_modules/prettier-plugin-packagejson"]
}
