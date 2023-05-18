import { Type } from "@sinclair/typebox"

export function file() {
    return Type.Object({
        file: Type.Unknown()
    })
}
