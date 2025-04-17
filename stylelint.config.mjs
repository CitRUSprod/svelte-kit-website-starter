/** @type {import("stylelint").Config} */
const config = {
    customSyntax: "postcss-html",
    extends: ["@citrus-linting/stylelint-config"],
    ignores: ["**/.svelte-kit/**/*", "**/dist/**/*"],
    plugins: ["stylelint-prettier"],
    rules: {
        "prettier/prettier": true,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
    }
}

export default config
