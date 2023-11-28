import { v4 as createUuid } from "uuid"
import { SocketModule } from "$/types"

interface RawChatMessage {
    text: string
}

interface ChatMessage {
    uuid: string
    user: {
        id: number
        username: string
    }
    text: string
}

const globalChatHistory: Array<ChatMessage> = []

export const globalChat: SocketModule = (socket, user) => {
    socket.on("global-chat:join", () => {
        socket.join("global-chat")
        socket.emit("global-chat:get-history", globalChatHistory)
    })

    socket.on("global-chat:leave", () => {
        socket.leave("global-chat")
    })

    if (user) {
        socket.on("global-chat:send", (rawMsg: RawChatMessage) => {
            const msg: ChatMessage = {
                uuid: createUuid(),
                user: {
                    id: user.id,
                    username: user.username
                },
                text: rawMsg.text
            }

            if (globalChatHistory.length === 100) {
                globalChatHistory.shift()
            }

            globalChatHistory.push(msg)

            socket.emit("global-chat:receive", msg)
            socket.broadcast.to("global-chat").emit("global-chat:receive", msg)
        })
    }
}
