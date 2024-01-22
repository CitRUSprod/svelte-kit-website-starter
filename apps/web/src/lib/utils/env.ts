import { z } from "zod"
import { fromZodError } from "zod-validation-error"
import * as publicEnv from "$env/static/public"

const scheme = z.object({
    PUBLIC_IS_DOCKER_CONTAINER: z.coerce.boolean(),
    PUBLIC_TITLE: z.string().trim().min(1),
    PUBLIC_BASE_URL: z.string().trim().url()
})

let env: z.infer<typeof scheme>

try {
    env = scheme.parse(publicEnv)
} catch (err: unknown) {
    if (err instanceof z.ZodError) {
        throw fromZodError(err)
    } else {
        throw err
    }
}

export { env }
