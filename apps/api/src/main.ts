import fastify from "fastify"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import staticPlugin from "@fastify/static"
import multipart from "@fastify/multipart"
import jwt from "@fastify/jwt"
import cookie from "@fastify/cookie"
import auth from "@fastify/auth"
import socketIo from "fastify-socket.io"
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
} from "fastify-type-provider-zod"
import { BadRequestError } from "http-errors-enhanced"
import { parseZodError, ZodError } from "@local/utils"
import { env } from "$/constants"
import { hooks } from "$/hooks"
import { decorators } from "$/decorators"
import { routes } from "$/routes"
import { initSockets } from "$/sockets"
import { getAbsFilesPath } from "$/utils"

const port = 6702

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(err => {
    if (err instanceof ZodError) {
        return new BadRequestError(parseZodError(err).message)
    } else {
        return err
    }
})

if (env.ENABLE_DOCS) {
    app.register(swagger, {
        swagger: {
            info: {
                title: "SvelteKit Website Starter API",
                version: ""
            }
        },
        transform: jsonSchemaTransform
    }).register(swaggerUi, {
        routePrefix: "/docs"
    })
}

app.register(staticPlugin, { root: getAbsFilesPath(), prefix: "/files" })
    .register(multipart, { attachFieldsToBody: true })
    .register(jwt, { secret: env.JWT_SECRET, cookie: { cookieName: "accessToken", signed: false } })
    .register(cookie)
    .register(auth)
    .register(socketIo)

app.register(hooks).register(decorators).register(routes)

await app.ready()

await app.listen({
    host: "0.0.0.0",
    port
})

initSockets(app)

console.log(`Running on http://localhost:${port}`)
