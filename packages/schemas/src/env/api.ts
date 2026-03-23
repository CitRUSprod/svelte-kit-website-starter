import { z } from "@repo/utils"

import * as common from "$/common"

export function $api() {
    return z.object({
        IS_DOCKER_CONTAINER: z.coerce.boolean(),
        PUBLIC_BASE_URL: common.$url(),
        POSTGRES_URL: z.string().trim().min(1),
        MINIO_USER: z.string().trim().min(1),
        MINIO_PASSWORD: z.string().trim().min(1),
        ENABLE_SWAGGER: z.stringbool(),
        JWT_SECRET: z.string().trim().min(6),
        TWITCH_CLIENT_ID: z.string().trim().length(30),
        TWITCH_CLIENT_SECRET: z.string().trim().length(30),
        MAILER_HOST: z
            .string()
            .trim()
            .regex(
                /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/
            ),
        MAILER_PORT: z.coerce.number().int().positive(),
        MAILER_EMAIL: common.$email(),
        MAILER_PASSWORD: z.string().trim().min(1),
        MAILER_NAME: z.string().trim().min(1)
    })
}

export type $Api = z.infer<ReturnType<typeof $api>>
