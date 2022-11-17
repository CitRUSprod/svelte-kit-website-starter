/** @type {import("eslint").Linter.Config} */
const config = {
    extends: ["@citrus-linting", "@citrus-linting/eslint-config/typescript", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [2]
    },
    overrides: [
        {
            files: ["*.json"],
            parser: "any-eslint-parser"
        },
        {
            files: ["*.y?(a)ml"],
            parser: "any-eslint-parser"
        },
        {
            files: ["*.md"],
            parser: "any-eslint-parser",
            rules: {
                "prettier/prettier": [2, { parser: "markdown" }]
            }
        },
        {
            files: ["*.ts"],
            parserOptions: {
                project: "./services/*/tsconfig.json"
            }
        }
    ]
}

module.exports = config
