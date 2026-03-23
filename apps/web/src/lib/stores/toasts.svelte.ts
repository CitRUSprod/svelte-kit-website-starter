import type { ComponentBasicVariant } from "$lib/types"

interface Toast {
    id: number
    variant: ComponentBasicVariant
    text: string
}

const list = $state<Array<Readonly<Toast>>>([])

function remove(id: number) {
    const index = list.findIndex(toast => toast.id === id)

    if (index > -1) {
        list.splice(index, 1)
    }
}

function add(variant: ComponentBasicVariant, text: string, timeout = 5000) {
    const id = Date.now()
    const toast: Toast = {
        id,
        variant,
        text: text.trim()
    }
    list.push(toast)

    setTimeout(() => {
        remove(id)
    }, timeout)
}

export const toasts = {
    get list() {
        return list as ReadonlyArray<Readonly<Toast>>
    },
    add,
    remove
}
