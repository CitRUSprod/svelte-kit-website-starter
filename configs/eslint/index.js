module.exports = {
    extends: [
        "@citrus-linting",
        "@citrus-linting/eslint-config/typescript",
        "@citrus-linting/eslint-config/svelte-typescript",
        "prettier"
    ],
    overrides: [
        {
            files: "*.{ts,svelte}",
            parserOptions: {
                project: "./services/*/tsconfig.json"
            }
        }
    ]
}
