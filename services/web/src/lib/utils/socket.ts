import io from "socket.io-client"
import { parse } from "set-cookie-parser"

export const socket = io({
    path: "/api/socket.io",
    transports: ["websocket"],
    auth(done) {
        const cookies = parse(document.cookie)
        const cookie = cookies.find(c => c.name === "accessToken")
        done(cookie ? { auth_token: cookie.value } : {})
    }
})
