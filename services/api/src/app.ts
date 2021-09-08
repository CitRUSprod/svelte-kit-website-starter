import fastify from "fastify"
import auth from "fastify-auth"
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import socketIo from "fastify-socket.io"
import routes from "$/routes"

const port = 6702

const jwtSecret = process.env.JWT_SECRET!

const app = fastify()

app.register(jwt, { secret: jwtSecret }).register(cookie).register(auth).register(socketIo)

app.register(routes)

app.listen(port, "0.0.0.0", (err: Error | undefined) => {
    if (err) throw err

    app.io.on("connection", socket => {
        socket.on("globalChat.join", () => {
            socket.join("globalChat")
        })

        socket.on("globalChat.leave", () => {
            socket.leave("globalChat")
        })

        socket.on("globalChat.send", (data: any) => {
            socket.emit("globalChat.receive", data)
            socket.broadcast.to("globalChat").emit("globalChat.receive", data)
        })
    })

    console.log(`Running on http://localhost:${port}`)
})
