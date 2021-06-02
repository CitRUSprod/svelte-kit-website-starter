import ReconnectingWebSocket from "reconnecting-websocket"
import type {
    WebSocketEventListenerMap,
    ErrorEvent as ErrEvent
} from "reconnecting-websocket/events"

export enum WSMessageType {
    Ping = "ping",
    Pong = "pong",
    GChatSentMessage = "g-chat-sent-message",
    GChatReceivedMessage = "g-chat-received-message"
}

interface WSMessageBase {
    type: WSMessageType
    data?: Record<string, any>
}

export interface WSMessage extends Record<WSMessageType, WSMessageBase> {
    [WSMessageType.Ping]: {
        type: WSMessageType.Ping
        data?: Record<string, any>
    }
    [WSMessageType.Pong]: {
        type: WSMessageType.Pong
        data?: Record<string, any>
    }
    [WSMessageType.GChatSentMessage]: {
        type: WSMessageType.GChatSentMessage
        data: {
            text: string
        }
    }
    [WSMessageType.GChatReceivedMessage]: {
        type: WSMessageType.GChatReceivedMessage
        data: {
            sender: string
            text: string
        }
    }
}

export interface WSListener<T extends WSMessageType = WSMessageType.Ping> {
    open(): void
    close(): void
    error(error: ErrEvent["error"]): void
    message(data: WSMessage[T]["data"]): void
}

export interface WSListenerOptions {
    once: boolean
}

export interface WSClientOptions {
    startPolling: boolean
    pollingTimeout: number
}

export class WSClient {
    private readonly _ws: ReconnectingWebSocket
    private readonly _options: WSClientOptions
    private readonly _nativeListeners: Partial<WebSocketEventListenerMap> = {}
    private readonly _listeners = {
        open: new Map<WSListener["open"], WSListenerOptions>(),
        close: new Map<WSListener["close"], WSListenerOptions>(),
        error: new Map<WSListener["error"], WSListenerOptions>(),
        message: {} as Record<string, Map<WSListener["message"], WSListenerOptions> | undefined>
    }

    private _pollingInterval?: number

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly CONNECTING = ReconnectingWebSocket.CONNECTING
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly OPEN = ReconnectingWebSocket.OPEN
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly CLOSING = ReconnectingWebSocket.CLOSING
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly CLOSED = ReconnectingWebSocket.CLOSED

    public constructor(options: Partial<WSClientOptions> = {}) {
        const defaultOptions: WSClientOptions = {
            startPolling: true,
            pollingTimeout: 30 * 60 * 1000
        }
        this._options = { ...defaultOptions, ...options }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws = new ReconnectingWebSocket(`ws://${location.host}/api/ws`)

        if (this._options.startPolling) {
            this.startPolling()
        }
    }

    private _on<T extends keyof WebSocketEventListenerMap>(
        type: T,
        listener: WebSocketEventListenerMap[T]
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws.addEventListener(type, listener)
        return this
    }

    private _off<T extends keyof WebSocketEventListenerMap>(
        type: T,
        listener: WebSocketEventListenerMap[T]
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws.removeEventListener(type, listener)
        return this
    }

    public get readyState() {
        return this._ws.readyState
    }

    public close() {
        this.stopPolling()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws.close()
        return this
    }

    public reconnect() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws.reconnect()

        if (this._options.startPolling) {
            this.startPolling()
        }

        return this
    }

    public send(message: WSMessage[keyof WSMessage]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._ws.send(JSON.stringify(message))

        if (this._pollingInterval !== undefined) {
            this.stopPolling().startPolling()
        }

        return this
    }

    public ping() {
        const message: WSMessage[WSMessageType.Ping] = {
            type: WSMessageType.Ping
        }
        this.send(message)
        return this
    }

    public startPolling(timeout?: number) {
        if (this._pollingInterval === undefined) {
            this._pollingInterval = window.setInterval(() => {
                if (this.readyState === WSClient.OPEN) {
                    this.ping()
                }
            }, timeout ?? this._options.pollingTimeout)
        }
        return this
    }

    public stopPolling() {
        if (this._pollingInterval !== undefined) {
            clearInterval(this._pollingInterval)
            this._pollingInterval = undefined
        }
        return this
    }

    public on(
        type: "open",
        listener: WSListener["open"],
        options?: Partial<WSListenerOptions>
    ): this
    public on(
        type: "close",
        listener: WSListener["close"],
        options?: Partial<WSListenerOptions>
    ): this
    public on(
        type: "error",
        listener: WSListener["error"],
        options?: Partial<WSListenerOptions>
    ): this
    public on<T extends WSMessageType>(
        type: "message",
        messageType: T,
        listener: WSListener<T>["message"],
        options?: Partial<WSListenerOptions>
    ): this
    public on<T extends keyof WebSocketEventListenerMap, K extends WSMessageType>(
        type: T,
        messageTypeOrListener: T extends "message" ? K : WSListener[T],
        listenerOrOptions?: T extends "message"
            ? WSListener<K>["message"]
            : Partial<WSListenerOptions>,
        options?: T extends "message" ? Partial<WSListenerOptions> : never
    ) {
        const defaultOptions: WSListenerOptions = {
            once: false
        }

        switch (type) {
            case "open": {
                const justOptions = listenerOrOptions as WSListenerOptions | undefined
                const opts = justOptions ? { ...defaultOptions, ...justOptions } : defaultOptions

                const justListener = messageTypeOrListener as WSListener["open"]
                this._listeners.open.set(justListener, opts)

                if (!this._nativeListeners.open) {
                    this._nativeListeners.open = () => {
                        const listeners = this._listeners.open

                        for (const [l, o] of listeners.entries()) {
                            l()
                            if (o.once) this.off("open", l)
                        }
                    }
                    this._on("open", this._nativeListeners.open)
                }

                break
            }

            case "close": {
                const justOptions = listenerOrOptions as WSListenerOptions | undefined
                const opts = justOptions ? { ...defaultOptions, ...justOptions } : defaultOptions

                const justListener = messageTypeOrListener as WSListener["close"]
                this._listeners.close.set(justListener, opts)

                if (!this._nativeListeners.close) {
                    this._nativeListeners.close = () => {
                        const listeners = this._listeners.close

                        for (const [l, o] of listeners.entries()) {
                            l()
                            if (o.once) this.off("close", l)
                        }
                    }
                    this._on("close", this._nativeListeners.close)
                }

                break
            }

            case "error": {
                const justOptions = listenerOrOptions as WSListenerOptions | undefined
                const opts = justOptions ? { ...defaultOptions, ...justOptions } : defaultOptions

                const justListener = messageTypeOrListener as WSListener["error"]
                this._listeners.error.set(justListener, opts)

                if (!this._nativeListeners.error) {
                    this._nativeListeners.error = e => {
                        const listeners = this._listeners.error

                        for (const [l, o] of listeners.entries()) {
                            l(e.error)
                            if (o.once) this.off("error", l)
                        }
                    }
                    this._on("error", this._nativeListeners.error)
                }

                break
            }

            case "message": {
                const justOptions = options as WSListenerOptions | undefined
                const opts = justOptions ? { ...defaultOptions, ...justOptions } : defaultOptions

                const messageType = messageTypeOrListener as WSMessageType
                const messageListener = listenerOrOptions as WSListener<K>["message"]

                if (this._listeners.message[messageType]) {
                    this._listeners.message[messageType]!.set(messageListener, opts)
                } else {
                    this._listeners.message[messageType] = new Map([[messageListener, opts]])
                }

                if (!this._nativeListeners.message) {
                    this._nativeListeners.message = e => {
                        const message: WSMessage[keyof WSMessage] = JSON.parse(e.data)
                        const listeners = this._listeners.message[message.type]

                        if (listeners) {
                            for (const [l, o] of listeners.entries()) {
                                l(message.data)
                                if (o.once) this.off("message", message.type, l)
                            }
                        }
                    }
                    this._on("message", this._nativeListeners.message)
                }

                break
            }
        }

        return this
    }

    public off(): this
    public off(type: "open", listener?: WSListener["open"]): this
    public off(type: "close", listener?: WSListener["close"]): this
    public off(type: "error", listener?: WSListener["error"]): this
    public off<T extends WSMessageType>(
        type: "message",
        messageType?: T,
        listener?: WSListener<T>["message"]
    ): this
    public off<T extends keyof WebSocketEventListenerMap, K extends WSMessageType>(
        type?: T,
        messageTypeOrListener?: T extends "message" ? K : WSListener[T],
        listener?: T extends "message" ? WSListener<K>["message"] : never
    ) {
        switch (type) {
            case "open": {
                const justListener = messageTypeOrListener as WSListener["open"] | undefined

                if (justListener) {
                    const listeners = this._listeners.open

                    listeners.delete(justListener)

                    if (listeners.size === 0) {
                        this._off("open", this._nativeListeners.open!)
                        delete this._nativeListeners.open
                    }
                } else {
                    const listeners = this._listeners.open

                    for (const l of listeners.keys()) {
                        this.off("open", l)
                    }
                }

                break
            }

            case "close": {
                const justListener = messageTypeOrListener as WSListener["close"] | undefined

                if (justListener) {
                    const listeners = this._listeners.close

                    listeners.delete(justListener)

                    if (listeners.size === 0) {
                        this._off("close", this._nativeListeners.close!)
                        delete this._nativeListeners.close
                    }
                } else {
                    const listeners = this._listeners.close

                    for (const l of listeners.keys()) {
                        this.off("close", l)
                    }
                }

                break
            }

            case "error": {
                const justListener = messageTypeOrListener as WSListener["error"] | undefined

                if (justListener) {
                    const listeners = this._listeners.error

                    listeners.delete(justListener)

                    if (listeners.size === 0) {
                        this._off("error", this._nativeListeners.error!)
                        delete this._nativeListeners.error
                    }
                } else {
                    const listeners = this._listeners.error

                    for (const l of listeners.keys()) {
                        this.off("error", l)
                    }
                }

                break
            }

            case "message": {
                const messageType = messageTypeOrListener as WSMessageType | undefined

                if (messageType && listener) {
                    const listeners = this._listeners.message[messageType]

                    if (listeners) {
                        listeners.delete(listener)

                        if (listeners.size === 0) {
                            delete this._listeners.message[messageType]

                            const types = Object.keys(this._listeners.message)

                            if (types.length === 0) {
                                this._off("message", this._nativeListeners.message!)
                                delete this._nativeListeners.message
                            }
                        }
                    }
                } else {
                    const messageTypes = Object.keys(
                        this._listeners.message
                    ) as Array<WSMessageType>

                    for (const t of messageTypes) {
                        const listeners = this._listeners.message[t]

                        for (const l of listeners!.keys()) {
                            this.off("message", t, l)
                        }
                    }
                }

                break
            }

            default: {
                this.off("open").off("close").off("error").off("message")
            }
        }

        return this
    }
}
