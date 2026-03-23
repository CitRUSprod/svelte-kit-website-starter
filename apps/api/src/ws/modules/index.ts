import { globalChat } from "./global-chat"

import type { SocketModule } from "$/types"

export const initModules: SocketModule = (app, socket, user) => {
    globalChat(app, socket, user)
}
