import { Type } from "@sinclair/typebox"
import { createValidator } from "$lib/utils"

export const name = createValidator(
    Type.String({ minLength: 1, transform: ["trim", "toLowerCase"] })
)
