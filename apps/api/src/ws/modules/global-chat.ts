import * as constantsWs from "@repo/constants/ws"
import * as schemasCommon from "@repo/schemas/common"
import * as schemasWs from "@repo/schemas/ws"
import { defineWsEmit, defineWsOn } from "@repo/utils"
import { v4 as createUuid } from "uuid"

import type { SocketModule } from "$/types"

const wsEvents = constantsWs.globalChat.server

const globalChatHistory: Array<schemasCommon.chat.$Message> = []

export const globalChat: SocketModule = (app, socket, user) => {
    socket.on(
        wsEvents.on.join,
        defineWsOn<schemasWs.globalChat.$Join>(() => {
            socket.join(wsEvents.room)
            socket.emit(
                wsEvents.emit.receiveHistory,
                defineWsEmit<schemasWs.globalChat.$ReceiveHistory>(globalChatHistory)
            )
        })
    )

    socket.on(
        wsEvents.on.leave,
        defineWsOn<schemasWs.globalChat.$Leave>(() => {
            socket.leave(wsEvents.room)
        })
    )

    if (user) {
        socket.on(
            wsEvents.on.sendMessage,
            defineWsOn<schemasWs.globalChat.$SendMessage>(rawMsg => {
                const msg: schemasCommon.chat.$Message = {
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

                socket.emit(
                    wsEvents.emit.receiveMessage,
                    defineWsEmit<schemasWs.globalChat.$ReceiveMessage>(msg)
                )
                socket.broadcast
                    .to(wsEvents.room)
                    .emit(
                        wsEvents.emit.receiveMessage,
                        defineWsEmit<schemasWs.globalChat.$ReceiveMessage>(msg)
                    )
            })
        )
    }
}
