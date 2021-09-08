const estrella = require("estrella")
const defu = require("defu")
const baseConfig = require("./base")

/** @type {import("estrella").BuildConfig} */
const prodConfig = {
    tslint: false,
    define: {
        "process.env.NODE_ENV": JSON.stringify("production")
    }
}

estrella.build(defu(prodConfig, baseConfig))
