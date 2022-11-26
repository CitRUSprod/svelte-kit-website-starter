import { Type } from "@sinclair/typebox"
import { createValidator } from "$lib/utils"

export const email = createValidator(
    Type.String({ format: "email", transform: ["trim", "toLowerCase"] })
)

export const username = createValidator(
    Type.String({ minLength: 3, maxLength: 32, transform: ["trim"] })
)

export const password = createValidator(Type.String({ minLength: 8, transform: ["trim"] }))
