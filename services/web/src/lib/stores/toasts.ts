import { writable, derived } from "svelte/store"

type Type = "success" | "error" | "warning" | "info"

interface Toast {
    id: number
    type: Type
    text: string
}

type Toasts = Array<Readonly<Toast>>

const writableToasts = writable<Toasts>([])
const { subscribe } = derived(writableToasts, l => l as Readonly<Toasts>)

const { update } = writableToasts

function remove(id: number) {
    update(toasts => {
        const index = toasts.findIndex(toast => toast.id === id)

        if (index > -1) {
            toasts.splice(index, 1)
        }

        return toasts
    })
}

function add(type: Type, text: string, timeout = 5000) {
    update(toasts => {
        const id = Date.now()
        const toast: Toast = {
            id,
            type,
            text: text.trim()
        }
        toasts.push(toast)

        setTimeout(() => {
            remove(id)
        }, timeout)

        return toasts
    })
}

export const toasts = { subscribe, add, remove }
