import anyParser from "any-eslint-parser"
import prettier from "eslint-plugin-prettier"

import baseConfig from "@citrus-linting/eslint-config"
import typescriptConfig from "@citrus-linting/eslint-config/typescript"
import svelteTypescriptConfig from "@citrus-linting/eslint-config/svelte-typescript"

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

export default [
    {
        ignores: ["pnpm-lock.yaml", "**/.playwright", "**/.svelte-kit", "**/dist", "storage"]
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
        files: ["**/*.html"],
        languageOptions: {
            parser: anyParser
        },
        rules: {
            "prettier/prettier": [2, { parser: "html" }]
        }
    }
]
