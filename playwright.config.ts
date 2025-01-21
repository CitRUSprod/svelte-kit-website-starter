import { defineConfig, devices } from "@playwright/test"
import { config as dotenv } from "dotenv"
import { expand } from "dotenv-expand"

import { getTestsPath } from "$/tests/libs"

expand(dotenv())

const config = defineConfig({
    testDir: getTestsPath(),
    reporter: [["html", { outputFolder: getTestsPath(".playwright/report") }]],
    outputDir: getTestsPath(".playwright/result"),
    projects: [
        {
            name: "chrome",
            use: {
                ...devices["Desktop Chrome"],
                locale: "en-US"
            }
        },
        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                locale: "en-US"
            }
        },
        {
            name: "nexus-6",
            use: {
                ...devices["Nexus 6"],
                locale: "en-US"
            }
        }
    ]
})

export default config
