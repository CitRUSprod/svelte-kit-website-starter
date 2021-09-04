import fastify from "fastify"

const port = 6701

const app = fastify()

app.get("/", (request, reply) => {
    reply
        .type("text/html; charset=utf-8")
        .send(`<h1>SvelteKit Website Template</h1><h2>svelte-kit-website-template</h2>`)
})

app.listen(port, "0.0.0.0", (err: Error | null) => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
