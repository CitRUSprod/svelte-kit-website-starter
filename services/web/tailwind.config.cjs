/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const config = {
    mode: "jit",
    plugins: [require("daisyui")],
    purge: ["src/**/*.{html,svelte}"],
    daisyui: {
        logs: false
    }
}

module.exports = config
