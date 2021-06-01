const { build } = require("./base")

const prodConfig = {
    minify: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("production")
    }
}

build(prodConfig)
