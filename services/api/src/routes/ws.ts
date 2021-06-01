import { FastifyInstance, FastifyPluginOptions } from "fastify"
import WS from "ws"
import Database from "$/db"
import { UserPayload } from "$/assets/types"

enum WSMessageType {
    Ping = "ping",
    Pong = "pong",
    GChatSentMessage = "g-chat-sent-message",
    GChatReceivedMessage = "g-chat-received-message"
}

interface WSMessageBase {
    type: WSMessageType
    data?: Record<string, any>
}

interface WSMessage extends Record<WSMessageType, WSMessageBase> {
    [WSMessageType.Ping]: {
        type: WSMessageType.Ping
        data?: Record<string, any>
    }
    [WSMessageType.Pong]: {
        type: WSMessageType.Pong
        data?: Record<string, any>
    }
    [WSMessageType.GChatSentMessage]: {
        type: WSMessageType.GChatSentMessage
        data: {
            text: string
        }
    }
    [WSMessageType.GChatReceivedMessage]: {
        type: WSMessageType.GChatReceivedMessage
        data: {
            sender: string
            text: string
        }
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const { UserModel } = Database.models

function sendMessage(socket: WS, message: WSMessage[keyof WSMessage]) {
    socket.send(JSON.stringify(message))
}

export default (app: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    const users = new WeakMap<WS, string>()

    app.get("/", { websocket: true }, async (connection, req) => {
        if (req.cookies.token) {
            try {
                const payload: UserPayload = await app.jwt.verify(req.cookies.token)
                users.set(connection.socket, payload.id)
            } catch {}
        }

        connection.socket.on("message", (msgJson: string) => {
            async function onMessage() {
                try {
                    const message: WSMessage[keyof WSMessage] = JSON.parse(msgJson)

                    switch (message.type) {
                        case WSMessageType.Ping: {
                            sendMessage(connection.socket, {
                                type: WSMessageType.Pong
                            })

                            break
                        }

                        case WSMessageType.GChatSentMessage: {
                            const userId = users.get(connection.socket)

                            if (userId) {
                                const user = await UserModel.findById(userId)

                                if (user) {
                                    const { clients } = app.websocketServer

                                    for (const client of clients) {
                                        if (client.readyState === WS.OPEN) {
                                            sendMessage(client, {
                                                type: WSMessageType.GChatReceivedMessage,
                                                data: {
                                                    sender: user.username,
                                                    text: message.data.text
                                                }
                                            })
                                        }
                                    }
                                }
                            }

                            break
                        }
                    }
                } catch {}
            }

            onMessage()
        })
    })

    done()
}
