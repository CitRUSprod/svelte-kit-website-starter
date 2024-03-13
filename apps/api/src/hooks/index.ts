import changeScope from "fastify-plugin"
import { preHandler } from "./pre-handler"

export const hooks = changeScope((app, options, done) => {
    app.register(changeScope(preHandler))

    done()
})
