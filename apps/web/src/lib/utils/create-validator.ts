import type { z } from "zod"

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
