import { writable as svelteWritable, get } from "svelte/store"
import type { Writable } from "svelte/store"

export function writable<T>(key: string, value: T): Writable<T> {
    const store = svelteWritable(value)
    const { subscribe, set, update } = store
    const json = typeof localStorage === "undefined" ? null : localStorage.getItem(key)

    if (json) {
        set(JSON.parse(json))
    }

    function updateStorage(k: string, v: T) {
        localStorage.setItem(k, JSON.stringify(v))
    }

    return {
        subscribe,
        set(...[v]: Parameters<typeof set>) {
            updateStorage(key, v)
            set(v)
        },
        update(...[u]: Parameters<typeof update>) {
            const v = u(get(store))
            updateStorage(key, v)
            set(v)
        }
    }
}
