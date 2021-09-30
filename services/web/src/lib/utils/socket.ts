import io from "socket.io-client"
import { cookies } from "$lib/utils"

export const socket = io({
    path: "/api/socket.io",
    transports: ["websocket"],
    auth(done) {
        const { accessToken } = cookies.parse(document.cookie)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        done(accessToken ? { auth_token: accessToken } : {})
    }
})
