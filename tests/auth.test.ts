import { test as base, expect, Page } from "@playwright/test"
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

            const username = faker.internet.userName().replace(/\./g, "_")
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
        await page.getByText("Login").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })
        await page.getByText("Registration").click()
        await page.waitForURL(`${url}/en/auth/registration`, { waitUntil: "networkidle" })

        const inputs = page.locator("main input")
        const emailInput = inputs.nth(0)
        const usernameInput = inputs.nth(1)
        const passwordInput = inputs.nth(2)
        const passwordConfirmationInput = inputs.nth(3)

        await emailInput.fill(userData.email)
        await usernameInput.fill(userData.username)
        await passwordInput.fill(userData.password)
        await passwordConfirmationInput.fill(userData.password)

        await page.getByText("Register", { exact: true }).click()
        await page.getByText("Success", { exact: true }).waitFor()

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

        const logoutButtonIsVisible = await page.getByText("Logout").isVisible()
        expect(logoutButtonIsVisible).toBe(true)
    })

    test("login and logout", async ({ page, userData }) => {
        await page.getByText("Login").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })

        const inputs = page.locator("main input")
        const emailInput = inputs.nth(0)
        const passwordInput = inputs.nth(1)

        await emailInput.fill(userData.email)
        await passwordInput.fill(userData.password)

        await page.locator("main button").click()
        await page.getByText("Success", { exact: true }).waitFor()
        await page.getByText("Success", { exact: true }).waitFor({ state: "hidden" })

        await page.getByText("Logout").click()
        await page.getByText("Success", { exact: true }).waitFor()
        await page.waitForURL(`${url}/en`, { waitUntil: "networkidle" })

        const loginButtonIsVisible = await page.getByText("Login").isVisible()
        expect(loginButtonIsVisible).toBe(true)
    })

    test("login and delete account", async ({ page, userData }) => {
        await page.getByText("Login").click()
        await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })

        const inputs = page.locator("main input")
        const emailInput = inputs.nth(0)
        const passwordInput = inputs.nth(1)

        await emailInput.fill(userData.email)
        await passwordInput.fill(userData.password)

        await page.locator("main button").click()
        await page.getByText("Success", { exact: true }).waitFor()
        await page.getByText("Success", { exact: true }).waitFor({ state: "hidden" })

        await page.getByText("Profile").click()
        await page.getByText("Remove account").click()

        const usernameInput = page.locator(`input[placeholder="${userData.username}"]`)
        await usernameInput.waitFor()
        await usernameInput.fill(userData.username)
        await page.getByText("Remove", { exact: true }).click()
        await page.waitForURL(`${url}/en`, { waitUntil: "networkidle" })

        const loginButtonIsVisible = await page.getByText("Login").isVisible()
        expect(loginButtonIsVisible).toBe(true)
    })
})
