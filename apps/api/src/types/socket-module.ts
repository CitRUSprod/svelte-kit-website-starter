import type { User } from "@prisma/client"
import { Socket } from "socket.io"

export type SocketModule = (socket: Socket, user: User | null) => void
