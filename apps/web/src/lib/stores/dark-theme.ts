import { writable } from "svelte/store"

import { browser } from "$app/environment"
import { persist, createCookieStorage } from "@macfja/svelte-persistent-store"

function setDarkClass(value: boolean) {
    document.documentElement.classList[value ? "add" : "remove"]("dark")
}

const defaultValue = false

const { subscribe, update } = browser
    ? persist(writable(defaultValue), createCookieStorage({ expires: 100 }), "darkTheme")
    : writable(defaultValue)

function toggle() {
    update(v => {
        const newValue = !v
        setDarkClass(newValue)
        return newValue
    })
}

export const darkTheme = { subscribe, toggle }
