import { test, expect } from "@playwright/test"

const url = process.env.PUBLIC_BASE_URL!

test.beforeEach(async ({ page }) => {
    await page.goto(url, { waitUntil: "networkidle" })
})

test.describe.serial("en", () => {
    test.use({ locale: "en-US" })

    test("redirect to locale url", async ({ page }) => {
        await expect(page).toHaveURL(`${url}/en`)
    })

    test("has locale cookie", async ({ context }) => {
        const cookies = await context.cookies(url)
        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "locale",
                    value: "en"
                })
            ])
        )
    })

    test("switch to ru locale", async ({ page }) => {
        await page.getByTestId("locale-ru-button").click()
        await expect(page).toHaveTitle("Главная")
    })
})

test.describe("ru", () => {
    test.use({ locale: "ru-RU" })

    test("redirect to locale url", async ({ page }) => {
        await expect(page).toHaveURL(`${url}/ru`)
    })

    test("has locale cookie", async ({ context }) => {
        const cookies = await context.cookies(url)
        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "locale",
                    value: "ru"
                })
            ])
        )
    })

    test("switch to en locale", async ({ page }) => {
        await page.getByTestId("locale-en-button").click()
        await expect(page).toHaveTitle("Home")
    })
})

test.describe("another", () => {
    test.use({ locale: "pt-BR" })

    test("redirect to en locale url", async ({ page }) => {
        await expect(page).toHaveURL(`${url}/en`)
    })

    test("has en locale cookie", async ({ context }) => {
        const cookies = await context.cookies(url)
        expect(cookies).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "locale",
                    value: "en"
                })
            ])
        )
    })

    test("switch to ru locale", async ({ page }) => {
        await page.getByTestId("locale-ru-button").click()
        await expect(page).toHaveTitle("Главная")
    })
})
