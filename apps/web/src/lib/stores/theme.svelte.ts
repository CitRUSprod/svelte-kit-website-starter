import Cookies from "js-cookie"

import { browser } from "$app/environment"

function setDarkClass(value: boolean) {
    document.documentElement.classList[value ? "add" : "remove"]("dark")
}

const defaultValue = false

const cookieName = "darkTheme"

const initialValue = browser ? Cookies.get(cookieName) === "true" : defaultValue

let dark = $state(initialValue)

if (browser) {
    setDarkClass(initialValue)
}

function toggle() {
    dark = !dark
    Cookies.set(cookieName, String(dark), {
        path: "/",
        sameSite: "lax",
        expires: 100
    })
    setDarkClass(dark)
}

export const theme = {
    get dark() {
        return dark
    },
    toggle
}
