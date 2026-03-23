import type { FastifyInstance } from "fastify"
import { Socket } from "socket.io"

import type { User } from "$/prisma/generated/client"

export type SocketModule = (app: FastifyInstance, socket: Socket, user: User | null) => void
