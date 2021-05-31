module.exports = {
    plugins: [
        require("tailwindcss")({
            mode: "jit",
            plugins: [require("daisyui")],
            purge: ["src/**/*.{html,svelte}"],
            daisyui: {
                logs: false
            }
        }),
        require("postcss-nested")
    ]
}
