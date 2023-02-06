import { get } from "svelte/store"
import { persisted } from "svelte-local-storage-store"

function setDarkClass(value: boolean) {
    document.documentElement.classList[value ? "add" : "remove"]("dark")
}

const { subscribe, update } = persisted("dark-theme", false)

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
