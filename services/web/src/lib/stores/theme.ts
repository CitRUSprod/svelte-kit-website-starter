import { get } from "svelte/store"
import { writable } from "svelte-local-storage-store"

function setDarkClass(value: boolean) {
    document.documentElement.dataset.theme = value ? "dracula" : "light"
}

function createThemeStore() {
    const { subscribe, update } = writable("theme-dark", false)
    const dark = { subscribe }

    function sync() {
        setDarkClass(get(dark))
    }

    function toggle() {
        update(d => {
            const newDark = !d
            setDarkClass(newDark)
            return newDark
        })
    }

    return { dark, sync, toggle }
}

export const theme = createThemeStore()
