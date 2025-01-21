import { persist, createCookieStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"

import { browser } from "$app/environment"

function setDarkClass(value: boolean) {
    document.documentElement.classList[value ? "add" : "remove"]("dark")
}

const defaultValue = false

const { subscribe, update } = browser
    ? persist(
          writable(defaultValue),
          createCookieStorage({ expires: 100, samesite: "Lax" }),
          "darkTheme"
      )
    : writable(defaultValue)

function toggle() {
    update(v => {
        const newValue = !v
        setDarkClass(newValue)
        return newValue
    })
}

export const darkTheme = { subscribe, toggle }
