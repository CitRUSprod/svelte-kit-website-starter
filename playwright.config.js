import { config as dotenv } from "dotenv"
import { expand } from "dotenv-expand"
import { devices } from "@playwright/test"

expand(dotenv())

/** @type {import("@playwright/test").PlaywrightTestConfig} */
const config = {
    testDir: "./tests",
    reporter: "html",
    projects: [
        {
            name: "chrome",
            use: {
                ...devices["Desktop Chrome"],
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
}

export default config
