import fastify from "fastify"
import socketIo from "fastify-socket.io"

const port = 6702

const app = fastify()

app.register(socketIo)

app.get("/", (req, reply) => {
    reply.send({
        message: "Hello world"
    })
})

app.listen(port, "0.0.0.0", (err: Error | undefined) => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)

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
})
