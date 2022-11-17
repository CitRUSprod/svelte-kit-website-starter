import { extractorSvelte, presetUno, presetIcons, transformerDirectives } from "unocss"
import { colors } from "@unocss/preset-wind"
import { presetBetterNestedColors } from "unocss-preset-better-nested-colors"

function getColors([lightColor, lightShade], [darkColor, darkShade]) {
    return {
        DEFAULT: `${lightColor}-${lightShade}`,
        ":dark": `${darkColor}-${darkShade}`,
        lighter: {
            DEFAULT: `${lightColor}-${lightShade - 100}`,
            ":dark": `${darkColor}-${darkShade + 100}`
        },
        darker: {
            DEFAULT: `${lightColor}-${lightShade - 100}`,
            ":dark": `${darkColor}-${darkShade + 100}`
        }
    }
}

const contentColors = {
    light: "white",
    dark: "zinc-800"
}

const specialColors = {
    content: {
        DEFAULT: contentColors.light,
        ":dark": contentColors.dark,
        lighter: contentColors.light,
        darker: contentColors.dark,
        inverse: {
            DEFAULT: contentColors.dark,
            ":dark": contentColors.light
        }
    },
    default: getColors(["slate", 500], ["slate", 600]),
    primary: getColors(["orange", 400], ["teal", 700]),
    success: getColors(["green", 500], ["green", 600]),
    error: getColors(["red", 400], ["red", 500]),
    warning: getColors(["yellow", 400], ["yellow", 500]),
    info: getColors(["sky", 400], ["sky", 500])
}

/** @type {import("unocss/vite").VitePluginConfig} */
const config = {
    extractors: [extractorSvelte],
    presets: [
        presetUno(),
        presetBetterNestedColors({
            colors: {
                ...colors,
                ...specialColors
            }
        }),
        presetIcons()
    ],
    transformers: [transformerDirectives()],
    preprocess(matcher) {
        const prefix = "u:"
        return matcher.startsWith(prefix) ? matcher.slice(prefix.length) : undefined
    }
}

export default config
