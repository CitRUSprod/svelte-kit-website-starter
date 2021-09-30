import { FastifyInstance } from "fastify"
import socketIoJwtAuth from "socketio-jwt-auth"
import { User } from "$/db/entities"
import { Payload } from "$/types"

interface RawChatMessage {
    text: string
}

interface ChatMessage {
    user: {
        id: number
        username: string
    }
    text: string
}

function getUserFromSocket(socket: any) {
    const { logged_in: loggedIn, ...user } = socket.request.user

    if (loggedIn) {
        return user as User
    }

    return null
}

export function init(app: FastifyInstance, jwtSecret: string) {
    const usersRepository = app.orm.getRepository(User)

    app.io.use(
        socketIoJwtAuth.authenticate(
            { secret: jwtSecret, succeedWithoutToken: true },
            async (payload: Payload, done) => {
                if (Object.keys(payload).length) {
                    const user = await usersRepository.findOne(payload.id)

                    if (!user) {
                        done(null, null, "User not found")
                        return
                    }

                    done(null, user)
                    return
                }

                done()
            }
        )
    )

    const globalChatHistory: Array<ChatMessage> = []

    app.io.on("connection", socket => {
        const user = getUserFromSocket(socket)

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
    })
}
