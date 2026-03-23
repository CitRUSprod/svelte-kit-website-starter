/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
    framework: "@storybook/sveltekit",
    stories: ["../src/**/*.stories.svelte"],
    staticDirs: ["../static"],
    addons: [
        "@storybook/addon-svelte-csf",
        "@vueless/storybook-dark-mode",
        "@storybook/addon-docs"
    ],
    docs: {
        defaultName: "Documentation"
    }
}

export default config
