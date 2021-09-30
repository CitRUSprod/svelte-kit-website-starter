export interface RawChatMessage {
    text: string
}

export interface ChatMessage {
    user: {
        id: number
        username: string
    }
    text: string
}
