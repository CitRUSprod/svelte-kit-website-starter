/** @type {import("stylelint").Configuration} */
const config = {
    customSyntax: "postcss-html",
    extends: ["@citrus-linting/stylelint-config", "stylelint-config-prettier"],
    plugins: ["stylelint-prettier"],
    rules: {
        "prettier/prettier": true,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
    }
}

module.exports = config
