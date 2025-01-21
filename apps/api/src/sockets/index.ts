import type { User } from "@prisma/client"
import type { FastifyInstance } from "fastify"
import { authenticate } from "socketio-jwt-auth"

import { initModules } from "./modules"

import { env } from "$/constants"
import type { UserPayload } from "$/types"

const socketTimeouts: Record<string, ReturnType<typeof setTimeout>> = {}

function getUserFromSocket(socket: any) {
    const { logged_in: loggedIn, ...user } = socket.request.user
    return loggedIn ? (user as User) : null
}

export function initSockets(app: FastifyInstance) {
    app.io.use(
        authenticate(
            { secret: env.JWT_SECRET, succeedWithoutToken: true },
            (payload: UserPayload, done) => {
                if (Object.keys(payload).length) {
                    app.prisma.user
                        .findFirst({
                            where: { id: payload.id },
                            include: { role: true }
                        })
                        .then(user => {
                            if (user) {
                                done(null, user)
                            } else {
                                done(null, null, "User not found")
                            }
                        })
                } else {
                    done()
                }
            }
        ) as any
    )

    app.io.on("connection", socket => {
        const user = getUserFromSocket(socket)
        initModules(socket, user)

        socketTimeouts[socket.id] = setTimeout(
            () => {
                socket.disconnect()
            },
            24 * 60 * 60 * 1000
        )

        socket.on("disconnect", () => {
            clearTimeout(socketTimeouts[socket.id])
            delete socketTimeouts[socket.id]
        })
    })
}
