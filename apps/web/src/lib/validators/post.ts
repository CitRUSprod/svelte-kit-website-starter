import { Type } from "@sinclair/typebox"
import { createValidator } from "$lib/utils"

export const title = createValidator(
    Type.String({ minLength: 1, maxLength: 100, transform: ["trim"] })
)

export const content = createValidator(Type.String({ minLength: 1, transform: ["trim"] }))
