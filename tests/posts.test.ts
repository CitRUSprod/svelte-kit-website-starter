import { faker } from "@faker-js/faker"
import { test, expect } from "@playwright/test"

const url = process.env.PUBLIC_BASE_URL!

function generateTitle() {
    return `${faker.animal.cat()} ${faker.number.int({ min: 1_000_000, max: 9_999_999 })}`
}

function generateContent() {
    return faker.lorem.word({ length: { min: 20, max: 100 } })
}

const postTitle = generateTitle()
const postContent = generateContent()
const updatedPostTitle = generateTitle()
const updatedPostContent = generateContent()

test.beforeEach(async ({ page }) => {
    await page.goto(url, { waitUntil: "networkidle" })

    await page.getByTestId("login-header-button").click()
    await page.waitForURL(`${url}/en/auth/login`, { waitUntil: "networkidle" })

    await page.getByTestId("email-input").locator("input").fill("test.user@example.com")
    await page.getByTestId("password-input").locator("input").fill("qwerty123")
    await page.getByTestId("login-button").click()

    await page.getByTestId("success-toast").waitFor()
    await page.getByTestId("success-toast").waitFor({ state: "hidden" })

    await page.getByTestId("posts-header-button").click()
    await page.waitForURL(`${url}/en/posts`, { waitUntil: "networkidle" })
})

test.describe("posts", () => {
    test("create", async ({ page }) => {
        await page.getByTestId("create-post-button").click()

        await page.getByTestId("title-input").locator("input").fill(postTitle)
        await page.getByTestId("content-input").locator("textarea").fill(postContent)
        await page.getByTestId("create-post-dialog-button").click()

        await page.getByTestId("success-toast").waitFor()
        await page.getByTestId("success-toast").waitFor({ state: "hidden" })

        await expect(page).toHaveURL(new RegExp(`^${url}/en/posts/\\d+$`))

        const title = await page.getByTestId("content-title").textContent()
        const content = await page.getByTestId("content-body").textContent()

        expect(title).toBe(postTitle)
        expect(content).toContain(postContent)
    })

    test("search and edit", async ({ page }) => {
        await page.getByTestId("search-input").locator("input").fill(postTitle)

        await page.getByTestId("posts-pagination").locator('[data-indicator="loading"]').waitFor()
        await page
            .getByTestId("posts-pagination")
            .locator('[data-indicator="loading"]')
            .waitFor({ state: "hidden" })

        await page.getByTestId("post").click()
        await page.waitForURL(new RegExp(`^${url}/en/posts/\\d+$`), { waitUntil: "networkidle" })

        await page.getByTestId("edit-post-button").click()

        await page.getByTestId("title-input").locator("input").fill(updatedPostTitle)
        await page.getByTestId("content-input").locator("textarea").fill(updatedPostContent)
        await page.getByTestId("edit-post-dialog-button").click()

        await page.getByTestId("success-toast").waitFor()
        await page.getByTestId("success-toast").waitFor({ state: "hidden" })

        const title = await page.getByTestId("content-title").textContent()
        const content = await page.getByTestId("content-body").textContent()

        expect(title).toBe(updatedPostTitle)
        expect(content).toContain(updatedPostContent)
    })

    test("search and remove", async ({ page }) => {
        await page.getByTestId("search-input").locator("input").fill(updatedPostTitle)

        await page.getByTestId("posts-pagination").locator('[data-indicator="loading"]').waitFor()
        await page
            .getByTestId("posts-pagination")
            .locator('[data-indicator="loading"]')
            .waitFor({ state: "hidden" })

        await page.getByTestId("post").click()
        await page.waitForURL(new RegExp(`^${url}/en/posts/\\d+$`), { waitUntil: "networkidle" })

        await page.getByTestId("remove-post-button").click()

        await page.getByTestId("remove-post-dialog-button").click()
        await page.getByTestId("success-toast").waitFor()
        await page.getByTestId("success-toast").waitFor({ state: "hidden" })

        await expect(page).toHaveURL(`${url}/en/posts`)
    })
})
