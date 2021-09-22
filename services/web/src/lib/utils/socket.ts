import io from "socket.io-client"
import { parse as parseCookie } from "cookie"

export const socket = io({
    path: "/api/socket.io",
    transports: ["websocket"],
    auth(done) {
        const { accessToken } = parseCookie(document.cookie)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        done(accessToken ? { auth_token: accessToken } : {})
    }
})
