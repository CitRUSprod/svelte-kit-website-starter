declare module "socketio-jwt-auth" {
    import { FastifyInstance } from "fastify"

    export function authenticate(
        options: {
            secret: string
            algorithm?: string | undefined
            succeedWithoutToken?: boolean | undefined
        },
        verify: (
            payload: any,
            done: (err?: Error | null, user?: any, message?: string) => void
        ) => void | Promise<void>
    ): Parameters<FastifyInstance["io"]["use"]>[0]
}
