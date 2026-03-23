import { createWsClientEvents, createWsServerEvents } from "$/_internal/utils"

export const client = createWsClientEvents({
    room: "globalChat",
    emit: ["sendMessage"],
    on: ["receiveMessage", "receiveHistory"]
} as const)

export const server = createWsServerEvents(client)
