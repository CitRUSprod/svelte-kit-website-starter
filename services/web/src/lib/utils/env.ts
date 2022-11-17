import { Type } from "@sinclair/typebox"
import * as publicEnv from "$env/static/public"
import { parseByAjvSchema } from "./ajv"

const schema = Type.Strict(
    Type.Object(
        {
            PUBLIC_TITLE: Type.String({ minLength: 1, transform: ["trim"] })
        },
        { additionalProperties: false }
    )
)

export const env = parseByAjvSchema(schema, publicEnv, "env")
