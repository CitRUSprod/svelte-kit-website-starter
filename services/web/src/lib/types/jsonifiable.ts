import type { Jsonifiable, JsonPrimitive } from "type-fest"

export type JsonifiableArray = ReadonlyArray<Jsonifiable>
export type JsonifiableObject = Exclude<Jsonifiable, JsonPrimitive | JsonifiableArray>
