import { FastifyInstance } from "fastify"
import { authenticate } from "socketio-jwt-auth"
import { User } from "@prisma/client"
import { env } from "$/utils"
import { UserPayload } from "$/types"
import { initModules } from "./modules"

function getUserFromSocket(socket: any) {
    const { logged_in: loggedIn, ...user } = socket.request.user
    return loggedIn ? (user as User) : null
}

export function initSockets(app: FastifyInstance) {
    app.io.use(
        authenticate(
            { secret: env.JWT_SECRET, succeedWithoutToken: true },
            async (payload: UserPayload, done) => {
                if (Object.keys(payload).length) {
                    const user = await app.prisma.user.findFirst({
                        where: { id: payload.id },
                        include: { role: true }
                    })

                    if (user) {
                        done(null, user)
                    } else {
                        done(null, null, "User not found")
                    }
                } else {
                    done()
                }
            }
        )
    )

    app.io.on("connection", socket => {
        const user = getUserFromSocket(socket)
        initModules(socket, user)
    })
}
