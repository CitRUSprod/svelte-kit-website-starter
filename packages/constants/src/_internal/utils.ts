import type { SimplifyDeep, ReadonlyDeep } from "type-fest"

type Param = string | number

export function createWsClientEvents<
    Config extends {
        room: string | { name: Room; withParam?: boolean }
        emit?: ReadonlyArray<string>
        on?: ReadonlyArray<string>
    },
    Room extends string = Config["room"] extends { name: infer R }
        ? R extends string
            ? R
            : never
        : Config["room"] extends string
          ? Config["room"]
          : never
>(
    config: Config
): SimplifyDeep<
    ReadonlyDeep<
        {
            room: Config["room"] extends { withParam: true }
                ? <P extends Param>(param: P) => `${Room}:${P}`
                : Config["room"] extends { withParam?: boolean }
                  ? Config["room"]["withParam"] extends true
                      ? <P extends Param>(param: P) => `${Room}:${P}`
                      : Room
                  : Room
        } & {
            emit: {
                join: `${Room}:join`
                leave: `${Room}:leave`
            } & (Config extends { emit: infer E }
                ? E extends ReadonlyArray<string>
                    ? { [K in Exclude<E[number], "join" | "leave">]: `${Room}:${K}` }
                    : object
                : object)
        } & (Config extends { on: infer O }
                ? O extends ReadonlyArray<string>
                    ? { on: { [K in O[number]]: `${Room}:${K}` } }
                    : object
                : object)
    >
> {
    const baseEmitEvents = ["join", "leave"] as const
    const customEmitEvents = config.emit ?? []
    const allEmitEvents = [...baseEmitEvents, ...customEmitEvents] as const

    const roomConfig =
        typeof config.room === "string" ? { name: config.room, withParam: false } : config.room

    const emitEntries = allEmitEvents.map(str => [str, `${roomConfig.name}:${str}`] as const)

    const onEntries = (config.on ?? []).map(str => [str, `${roomConfig.name}:${str}`] as const)

    const withParam = roomConfig.withParam ?? false

    const room = withParam ? (param: Param) => `${roomConfig.name}:${param}` : roomConfig.name

    const result: any = {
        room,
        emit: Object.fromEntries(emitEntries) as {
            [K in (typeof allEmitEvents)[number]]: `${Room}:${K}`
        }
    }

    if (config.on !== undefined) {
        result.on = Object.fromEntries(onEntries) as {
            [K in (typeof config.on)[number]]: `${Room}:${K}`
        }
    }

    return result
}

type WsEventMap = Record<string, string>

export function createWsServerEvents<
    T extends {
        room: ((arg: Param) => string) | string
        emit?: WsEventMap
        on?: WsEventMap
    }
>(
    client: T
): SimplifyDeep<
    ReadonlyDeep<
        {
            room: T["room"]
        } & (T extends { on: WsEventMap } ? { emit: T["on"] } : object) &
            (T extends { emit: WsEventMap } ? { on: T["emit"] } : object)
    >
> {
    return {
        room: client.room,
        ...(client.on ? { emit: client.on } : {}),
        ...(client.emit ? { on: client.emit } : {})
    } as any
}
