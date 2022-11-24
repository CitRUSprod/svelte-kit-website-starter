import Ajv, { type ErrorObject } from "ajv"
import ajvKeywords from "ajv-keywords"
import ajvFormats from "ajv-formats"
import { AggregateAjvError } from "@segment/ajv-human-errors"
import { Type, type Static, type TSchema } from "@sinclair/typebox"

import type { JsonObject } from "type-fest"

export const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    verbose: true
})

ajvKeywords(ajv, ["transform"])
ajvFormats(ajv, ["email"])

export function normalizeAjvErrors(errors: Array<ErrorObject>, scope?: string) {
    const humanErrors = new AggregateAjvError(errors) as any
    const err = humanErrors.errors[0] as ErrorObject
    return scope ? new Error(`[${scope}] ${err.message!}`) : new Error(err.message)
}

export function parseByAjvSchema<T extends TSchema>(
    schema: T,
    data: JsonObject,
    scope?: string
): Static<T> {
    const newData = JSON.parse(JSON.stringify(data))
    const validate = ajv.compile(schema)

    if (validate(newData)) {
        return newData
    } else {
        throw normalizeAjvErrors(validate.errors!, scope)
    }
}

export function createValidator<T extends TSchema>(schema: T) {
    function validator(value: Static<typeof schema>) {
        const validate = ajv.compile(Type.Strict(Type.Object({ value: schema })))
        const obj = { value }
        const valid = validate(obj)
        return { valid, value: obj.value }
    }

    return validator
}
