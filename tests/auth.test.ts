import { test as base, expect, type Page } from "@playwright/test"
import { faker } from "@faker-js/faker"

const url = process.env.PUBLIC_BASE_URL!

interface Fixtures {
    userData: {
        dropMailPage: Page
        email: string
        username: string
        password: string
    }
}

let userDataGlobal: Fixtures["userData"] | undefined

const test = base.extend<Fixtures>({
    async userData({ context }, use) {
        if (!userDataGlobal) {
            const dropMailPage = await context.newPage()
            await dropMailPage.goto("https://dropmail.me/en/")

            const emailBlock = dropMailPage.locator(".address")
            await emailBlock.waitFor()
            const email = await emailBlock.textContent()

            if (!email) {
                throw new Error("Email not found")
            }

            const username = faker.internet.username().replace(/\./g, "_")
            const password = faker.internet.password({ length: 10 })

            userDataGlobal = { dropMailPage, email, username, password }
        }

        await use(userDataGlobal)
    }
})

test.beforeEach(async ({ page }) => {
    await page.goto(url, { waitUntil: "networkidle" })
})

test.setTimeout(5 * 60000)

test.describe.serial("auth", () => {
    test("register", async ({ page, userData }) => {
        await page.getByTestId("login-header-button").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })
        await page.getByTestId("registration-button").click()
        await page.waitForURL(`${url}/en/auth/registration`, { waitUntil: "networkidle" })

        await page.getByTestId("email-input").locator("input").fill(userData.email)
        await page.getByTestId("username-input").locator("input").fill(userData.username)
        await page.getByTestId("password-input").locator("input").fill(userData.password)
        await page
            .getByTestId("password-confirmation-input")
            .locator("input")
            .fill(userData.password)

        await page.getByTestId("register-button").click()
        await page.getByTestId("success-toast").waitFor()

        const messagesBlock = userData.dropMailPage.locator(".messages-list > li pre")
        await messagesBlock.waitFor()

        const text = await messagesBlock.textContent()

        if (!text) {
            throw new Error("Text not found")
        }

        const registrationUrlMatch = /https?:\/\/[^)]+/.exec(text)

        if (!registrationUrlMatch) {
            throw new Error("URL not found")
        }

        const registrationUrl = registrationUrlMatch[0]
        await page.goto(registrationUrl, { waitUntil: "networkidle" })
        await page.waitForURL(`${url}/en`, { waitUntil: "networkidle" })

        const logoutButtonIsVisible = await page.getByTestId("logout-header-button").isVisible()
        expect(logoutButtonIsVisible).toBe(true)
    })

    test("login and logout", async ({ page, userData }) => {
        await page.getByTestId("login-header-button").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })

        await page.getByTestId("email-input").locator("input").fill(userData.email)
        await page.getByTestId("password-input").locator("input").fill(userData.password)

        await page.getByTestId("login-button").click()
        await page.getByTestId("success-toast").waitFor()
        await page.getByTestId("success-toast").waitFor({ state: "hidden" })

        await page.getByTestId("logout-header-button").click()
        await page.getByTestId("success-toast").waitFor()
        await page.waitForURL(`${url}/en`, { waitUntil: "networkidle" })

        const loginButtonIsVisible = await page.getByTestId("login-header-button").isVisible()
        expect(loginButtonIsVisible).toBe(true)
    })

    test("login and delete account", async ({ page, userData }) => {
        await page.getByTestId("login-header-button").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })

        await page.getByTestId("email-input").locator("input").fill(userData.email)
        await page.getByTestId("password-input").locator("input").fill(userData.password)

        await page.getByTestId("login-button").click()
        await page.getByTestId("success-toast").waitFor()
        await page.getByTestId("success-toast").waitFor({ state: "hidden" })

        await page.getByTestId("profile-header-button").click()
        await page.getByTestId("remove-user-button").click()

        const usernameInput = page.getByTestId("username-input").locator("input")
        await usernameInput.waitFor()
        await usernameInput.fill(userData.username)
        await page.getByTestId("remove-user-dialog-button").click()
        await page.waitForURL(`${url}/en`, { waitUntil: "networkidle" })

        const loginButtonIsVisible = await page.getByTestId("login-header-button").isVisible()
        expect(loginButtonIsVisible).toBe(true)
    })
})
