export interface RawChatMessage {
    text: string
}

export interface ChatMessage {
    uuid: string
    user: {
        id: number
        username: string
    }
    text: string
}
