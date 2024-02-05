import { z, ZodError } from "zod"
import { fromZodError } from "zod-validation-error"

export function parseZodError(err: z.ZodError) {
    return fromZodError(err)
}

export function createValidator<T extends z.Schema>(schema: T) {
    function validator(value: z.infer<typeof schema>) {
        const result = schema.safeParse(value)

        if (result.success) {
            const data = result.data as z.infer<typeof schema>
            return { valid: true, value: data }
        } else {
            return { valid: false, value }
        }
    }

    return validator
}

export function parseDataBySchema<T extends z.Schema>(schema: T, data: unknown) {
    const result = schema.safeParse(data)

    if (result.success) {
        return result.data as z.infer<typeof schema>
    } else {
        throw parseZodError(result.error)
    }
}

export { ZodError }
