import { get } from "svelte/store"
import { writable } from "svelte-local-storage-store"

function setDarkClass(value: boolean) {
    document.documentElement.dataset.theme = value ? "dracula" : "light"
}

const { subscribe, update } = writable("dark-theme", false)

function sync() {
    setDarkClass(get({ subscribe }))
}

function toggle() {
    update(v => {
        const newValue = !v
        setDarkClass(newValue)
        return newValue
    })
}

export const darkTheme = { subscribe, sync, toggle }
