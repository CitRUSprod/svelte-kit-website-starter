import type { JsonValue } from "type-fest"

export function defineWsEmit<T extends JsonValue>(data: T) {
    return data
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function defineWsOn<T extends JsonValue | void>(cb: (data: T) => void | Promise<void>) {
    return cb
}
