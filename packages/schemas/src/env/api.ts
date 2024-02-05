import { z } from "zod"

export function api() {
    return z.object({
        JWT_SECRET: z.string().trim().min(6),
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
        MAILER_NAME: z.string().trim().min(1),
        EMAIL_CONFIRMATION_URL: z.string().trim().url(),
        PASSWORD_RESET_URL: z.string().trim().url()
    })
}

export type Api = z.infer<ReturnType<typeof api>>
