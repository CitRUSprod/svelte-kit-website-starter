import { globalChat } from "./global-chat"

import type { SocketModule } from "$/types"

export const initModules: SocketModule = (socket, user) => {
    globalChat(socket, user)
}
