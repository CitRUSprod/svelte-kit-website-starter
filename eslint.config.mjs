import baseConfig from "@citrus-linting/eslint-config"
import svelteTypescriptConfig from "@citrus-linting/eslint-config/svelte-typescript"
import typescriptConfig from "@citrus-linting/eslint-config/typescript"
import anyParser from "any-eslint-parser"
import prettierConfig from "eslint-config-prettier"
import prettier from "eslint-plugin-prettier"

typescriptConfig[0].languageOptions.parserOptions.project = [
    "./tsconfig.json",
    "./{apps,packages}/*/tsconfig.json"
]
svelteTypescriptConfig[0].languageOptions.parserOptions.project =
    "./{apps,packages}/*/tsconfig.eslint.json"

const prettierRules = {
    "prettier/prettier": 2,
    "arrow-body-style": 0,
    "prefer-arrow-callback": 0
}

const config = [
    {
        ignores: [
            "pnpm-lock.yaml",
            "**/.playwright",
            "**/.turbo",
            "**/.svelte-kit",
            "**/dist",
            "storage"
        ]
    },
    {
        plugins: { prettier }
    },
    {
        files: ["**/*.?([cm])js", "**/*.ts", "**/*.svelte"],
        rules: {
            ...prettierRules
        }
    },
    ...baseConfig,
    ...typescriptConfig,
    ...svelteTypescriptConfig,
    {
        files: ["**/*.json"],
        languageOptions: {
            parser: anyParser
        },
        rules: {
            "prettier/prettier": 2
        }
    },
    {
        files: ["**/*.y?(a)ml"],
        languageOptions: {
            parser: anyParser
        },
        rules: {
            "prettier/prettier": 2
        }
    },
    {
        files: ["**/*.md"],
        languageOptions: {
            parser: anyParser
        },
        rules: {
            "prettier/prettier": [2, { parser: "markdown" }]
        }
    },
    {
        files: ["**/*.html", "**/*.mjml"],
        languageOptions: {
            parser: anyParser
        },
        rules: {
            "prettier/prettier": [2, { parser: "html" }]
        }
    },
    prettierConfig
]

export default config
