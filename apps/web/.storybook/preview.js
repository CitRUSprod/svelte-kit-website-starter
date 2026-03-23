// eslint-disable-next-line import/no-unassigned-import
import "uno.css"
// eslint-disable-next-line import/no-unassigned-import
import "@unocss/reset/tailwind.css"
// eslint-disable-next-line import/no-unassigned-import
import "$styles/global.css"

import { DocsContainer } from "@storybook/addon-docs/blocks"
import { DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode"
import { useState, useEffect, createElement } from "react"
import { addons } from "storybook/preview-api"
import { themes } from "storybook/theming"

import { loadAllLocales, setLocale } from "../src/i18n/helpers"

loadAllLocales()
setLocale("en")

/** @type {import('@storybook/sveltekit').Preview} */
const preview = {
    parameters: {
        actions: {
            argTypesRegex: "^on[A-Z].*"
        },
        darkMode: {
            stylePreview: true,
            classTarget: "html"
        },
        docs: {
            toc: true,
            container({ children, context }) {
                const [isDark, setIsDark] = useState(false)

                useEffect(() => {
                    const channel = addons.getChannel()

                    function handleDarkMode(isDarkMode) {
                        setIsDark(isDarkMode)
                    }

                    channel.on(DARK_MODE_EVENT_NAME, handleDarkMode)

                    return () => {
                        channel.removeListener(DARK_MODE_EVENT_NAME, handleDarkMode)
                    }
                }, [])

                const theme = isDark ? themes.dark : themes.light

                return createElement(DocsContainer, { context, theme }, children)
            }
        }
    }
}

export default preview
