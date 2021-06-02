import { writable, derived } from "svelte/store"

type Type = "success" | "error" | "warning" | "info"

interface Message {
    id: number
    type: Type
    text: string
}

type Messages = Array<Readonly<Message>>

function createMessages() {
    const writableList = writable<Messages>([])
    const list = derived(writableList, l => l as Readonly<Messages>)

    const { update } = writableList

    function remove(id: number) {
        update(messages => {
            const index = messages.findIndex(msg => msg.id === id)
            messages.splice(index, 1)
            return messages
        })
    }

    function add(type: Type, text: string, timeout = 5000) {
        update(messages => {
            const id = Date.now()
            const message: Message = {
                id,
                type,
                text: text.trim()
            }
            messages.push(message)

            setTimeout(() => {
                remove(id)
            }, timeout)

            return messages
        })
    }

    return { list, add, remove }
}

export const messages = createMessages()
