import { createWsClientEvents, createWsServerEvents } from "./utils"

describe("createWsClientEvents", () => {
    describe("with simple room string", () => {
        it("should create basic events for a simple room", () => {
            const result = createWsClientEvents({
                room: "chat"
            })

            expect(result).toEqual({
                room: "chat",
                emit: {
                    join: "chat:join",
                    leave: "chat:leave"
                }
            })
        })

        it("should add emit events", () => {
            const result = createWsClientEvents({
                room: "game",
                emit: ["start", "pause", "stop"]
            })

            expect(result).toEqual({
                room: "game",
                emit: {
                    join: "game:join",
                    leave: "game:leave",
                    start: "game:start",
                    pause: "game:pause",
                    stop: "game:stop"
                }
            })
        })

        it("should add on events", () => {
            const result = createWsClientEvents({
                room: "notifications",
                on: ["message", "alert", "update"]
            })

            expect(result).toEqual({
                room: "notifications",
                emit: {
                    join: "notifications:join",
                    leave: "notifications:leave"
                },
                on: {
                    message: "notifications:message",
                    alert: "notifications:alert",
                    update: "notifications:update"
                }
            })
        })

        it("should work with both emit and on events simultaneously", () => {
            const result = createWsClientEvents({
                room: "lobby",
                emit: ["sendMessage", "typing"],
                on: ["receiveMessage", "userJoined", "userLeft"]
            })

            expect(result).toEqual({
                room: "lobby",
                emit: {
                    join: "lobby:join",
                    leave: "lobby:leave",
                    sendMessage: "lobby:sendMessage",
                    typing: "lobby:typing"
                },
                on: {
                    receiveMessage: "lobby:receiveMessage",
                    userJoined: "lobby:userJoined",
                    userLeft: "lobby:userLeft"
                }
            })
        })
    })

    describe("with room object without parameter", () => {
        it("should work like a simple string", () => {
            const result = createWsClientEvents({
                room: { name: "admin" }
            })

            expect(result).toEqual({
                room: "admin",
                emit: {
                    join: "admin:join",
                    leave: "admin:leave"
                }
            })
        })

        it("should work with withParam: false", () => {
            const result = createWsClientEvents({
                room: { name: "support", withParam: false }
            })

            expect(result).toEqual({
                room: "support",
                emit: {
                    join: "support:join",
                    leave: "support:leave"
                }
            })
        })
    })

    describe("with room object with parameter", () => {
        it("should create room function with withParam: true", () => {
            const { room, ...rest } = createWsClientEvents({
                room: { name: "gameRoom", withParam: true }
            })

            expect(room("123")).toBe("gameRoom:123")
            expect(room(456)).toBe("gameRoom:456")
            expect(rest).toEqual({
                emit: {
                    join: "gameRoom:join",
                    leave: "gameRoom:leave"
                }
            })
        })

        it("should work with custom events and parameter", () => {
            const { room, ...rest } = createWsClientEvents({
                room: { name: "privateChat", withParam: true },
                emit: ["sendMessage", "typing"],
                on: ["receiveMessage", "userTyping"]
            })

            expect(room("user123")).toBe("privateChat:user123")
            expect(rest).toEqual({
                emit: {
                    join: "privateChat:join",
                    leave: "privateChat:leave",
                    sendMessage: "privateChat:sendMessage",
                    typing: "privateChat:typing"
                },
                on: {
                    receiveMessage: "privateChat:receiveMessage",
                    userTyping: "privateChat:userTyping"
                }
            })
        })
    })

    describe("edge cases", () => {
        it("should work with empty emit and on arrays", () => {
            const result = createWsClientEvents({
                room: "empty",
                emit: [],
                on: []
            })

            expect(result).toEqual({
                room: "empty",
                emit: {
                    join: "empty:join",
                    leave: "empty:leave"
                },
                on: {}
            })
        })

        it("should work with specified join and leave events", () => {
            const result = createWsClientEvents({
                room: "test",
                emit: ["join", "leave", "custom"]
            })

            expect(result).toEqual({
                room: "test",
                emit: {
                    join: "test:join",
                    leave: "test:leave",
                    custom: "test:custom"
                }
            })
        })
    })
})

describe("createWsServerEvents", () => {
    describe("with simple room string", () => {
        it("should create server events from client events", () => {
            const client = {
                room: "testRoom",
                emit: {
                    sendMessage: "testRoom:sendMessage",
                    typing: "testRoom:typing"
                },
                on: {
                    receiveMessage: "testRoom:receiveMessage",
                    userJoined: "testRoom:userJoined"
                }
            }

            const result = createWsServerEvents(client)

            expect(result).toEqual({
                room: "testRoom",
                emit: {
                    receiveMessage: "testRoom:receiveMessage",
                    userJoined: "testRoom:userJoined"
                },
                on: {
                    sendMessage: "testRoom:sendMessage",
                    typing: "testRoom:typing"
                }
            })
        })

        it("should work with only emit events", () => {
            const client = {
                room: "emitOnly",
                emit: {
                    action1: "emitOnly:action1",
                    action2: "emitOnly:action2"
                }
            }

            const result = createWsServerEvents(client)

            expect(result).toEqual({
                room: "emitOnly",
                on: {
                    action1: "emitOnly:action1",
                    action2: "emitOnly:action2"
                }
            })
        })

        it("should work with only on events", () => {
            const client = {
                room: "onOnly",
                on: {
                    event1: "onOnly:event1",
                    event2: "onOnly:event2"
                }
            }

            const result = createWsServerEvents(client)

            expect(result).toEqual({
                room: "onOnly",
                emit: {
                    event1: "onOnly:event1",
                    event2: "onOnly:event2"
                }
            })
        })

        it("should work with only room", () => {
            const client = {
                room: "roomOnly"
            }

            const result = createWsServerEvents(client)

            expect(result).toEqual({
                room: "roomOnly"
            })
        })
    })

    describe("with room function", () => {
        it("should preserve room function", () => {
            const client = {
                room: (param: string | number) => `dynamic:${param}`,
                emit: {
                    test: "dynamic:test"
                },
                on: {
                    response: "dynamic:response"
                }
            }

            const { room, ...rest } = createWsServerEvents(client)

            expect(room("123")).toBe("dynamic:123")
            expect(rest).toEqual({
                emit: {
                    response: "dynamic:response"
                },
                on: {
                    test: "dynamic:test"
                }
            })
        })
    })

    describe("combined usage with createWsClientEvents", () => {
        it("should work correctly with createWsClientEvents result", () => {
            const client = createWsClientEvents({
                room: "integration",
                emit: ["clientAction", "clientRequest"],
                on: ["serverResponse", "serverNotification"]
            })

            const server = createWsServerEvents(client)

            expect(server).toEqual({
                room: "integration",
                emit: {
                    serverResponse: "integration:serverResponse",
                    serverNotification: "integration:serverNotification"
                },
                on: {
                    join: "integration:join",
                    leave: "integration:leave",
                    clientAction: "integration:clientAction",
                    clientRequest: "integration:clientRequest"
                }
            })
        })

        it("should work with room with parameter", () => {
            const client = createWsClientEvents({
                room: { name: "paramRoom", withParam: true },
                emit: ["action"],
                on: ["event"]
            })

            const { room, ...rest } = createWsServerEvents(client)

            expect(room("test")).toBe("paramRoom:test")
            expect(rest).toEqual({
                emit: {
                    event: "paramRoom:event"
                },
                on: {
                    join: "paramRoom:join",
                    leave: "paramRoom:leave",
                    action: "paramRoom:action"
                }
            })
        })
    })

    describe("edge cases", () => {
        it("should work with empty event objects", () => {
            const client = {
                room: "empty",
                emit: {},
                on: {}
            }

            const result = createWsServerEvents(client)

            expect(result).toEqual({
                room: "empty",
                emit: {},
                on: {}
            })
        })
    })
})
