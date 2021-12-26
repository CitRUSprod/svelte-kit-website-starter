/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const config = {
    plugins: [require("daisyui")],
    content: ["src/**/*.{html,svelte}"],
    daisyui: {
        logs: false
    }
}

module.exports = config
