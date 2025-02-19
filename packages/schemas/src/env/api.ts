import { z } from "@repo/utils"

export function api() {
    return z.object({
        IS_DOCKER_CONTAINER: z.coerce.boolean(),
        PUBLIC_BASE_URL: z.string().trim().url(),
        MINIO_USER: z.string().trim().min(1),
        MINIO_PASSWORD: z.string().trim().min(1),
        JWT_SECRET: z.string().trim().min(6),
        TWITCH_CLIENT_ID: z.string().trim().length(30),
        TWITCH_CLIENT_SECRET: z.string().trim().length(30),
        ENABLE_DOCS: z.coerce.boolean(),
        MAILER_HOST: z
            .string()
            .trim()
            .regex(
                /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/
            ),
        MAILER_PORT: z.coerce.number().int().min(1),
        MAILER_EMAIL: z.string().trim().toLowerCase().email(),
        MAILER_PASSWORD: z.string().trim().min(1),
        MAILER_NAME: z.string().trim().min(1)
    })
}

export type Api = z.infer<ReturnType<typeof api>>
