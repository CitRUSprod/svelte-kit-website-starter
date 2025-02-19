import * as constantsRoutes from "@repo/constants/routes"
import { parse } from "set-cookie-parser"
import io from "socket.io-client"

import { createApiUrl } from "./axios"

export const socket = io({
    path: createApiUrl(constantsRoutes.ws.base),
    transports: ["websocket"],
    auth(done) {
        const cookies = parse(document.cookie.split("; "))
        const cookie = cookies.find(c => c.name === "accessToken")
        done(cookie ? { auth_token: cookie.value } : {})
    }
})
