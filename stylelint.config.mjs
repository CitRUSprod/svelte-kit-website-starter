/** @type {import("stylelint").Config} */
const config = {
    extends: ["@citrus-linting/stylelint-config"],
    ignoreFiles: ["**/.svelte-kit/**/*", "**/.template", "**/dist/**/*"],
    plugins: ["stylelint-prettier"],
    rules: {
        "prettier/prettier": true,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
    },
    overrides: [
        {
            files: ["*.html", "*.svelte"],
            customSyntax: "postcss-html"
        }
    ]
}

export default config
