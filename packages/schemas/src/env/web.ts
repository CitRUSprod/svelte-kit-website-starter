import { z } from "zod"

export function web() {
    return z.object({
        PUBLIC_IS_DOCKER_CONTAINER: z.coerce.boolean(),
        PUBLIC_TITLE: z.string().trim().min(1),
        PUBLIC_BASE_URL: z.string().trim().url()
    })
}

export type Web = z.infer<ReturnType<typeof web>>
