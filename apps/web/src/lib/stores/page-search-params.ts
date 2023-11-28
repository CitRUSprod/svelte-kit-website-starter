import { writable } from "svelte/store"
import { page } from "$app/stores"

export const { subscribe, update, set } = writable("")

function customSubscribe(...args: Parameters<typeof subscribe>) {
    const unsubscribe1 = page.subscribe(p => {
        set(p.url.search)
    })
    const unsubscribe2 = subscribe(...args)

    function unsubscribe() {
        unsubscribe1()
        unsubscribe2()
    }

    return unsubscribe
}

export const pageSearchParams = { subscribe: customSubscribe, update, set }
