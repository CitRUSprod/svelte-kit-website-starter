import { writable, derived } from "svelte/store"

import type { ElementBasicVariant } from "$lib/types"

interface Toast {
    id: number
    variant: ElementBasicVariant
    text: string
}

type Toasts = Array<Readonly<Toast>>

const writableToasts = writable<Toasts>([])
const { subscribe } = derived(writableToasts, toasts => toasts as Readonly<Toasts>)

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

function add(variant: ElementBasicVariant, text: string, timeout = 5000) {
    update(toasts => {
        const id = Date.now()
        const toast: Toast = {
            id,
            variant,
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
