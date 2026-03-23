<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import TextField from "./TextField.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/TextField",
        component: TextField,
        tags: ["autodocs"],
        argTypes: disableControls("class", "onInput", "onFocus", "onBlur", "onKeyPress")
    })
</script>

<Story name="Default" />
<Story name="Label and placeholder" argTypes={disableControls("label", "placeholder")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-2">
            <TextField {...props} />
            <TextField {...props} label="Label" />
            <TextField {...props} placeholder="Placeholder" />
            <TextField {...props} label="Label" placeholder="Placeholder" />
        </div>
    {/snippet}
</Story>
<Story
    name="With icons + Label and placeholder"
    argTypes={disableControls("label", "placeholder", "leftIconClass", "rightIconClass")}
>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-2">
            <TextField {...props} leftIconClass="u:i-material-symbols-search" />
            <TextField {...props} label="Label" leftIconClass="u:i-material-symbols-search" />
            <TextField
                {...props}
                placeholder="Placeholder"
                leftIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                label="Label"
                placeholder="Placeholder"
                leftIconClass="u:i-material-symbols-search"
            />
            <TextField {...props} rightIconClass="u:i-material-symbols-search" />
            <TextField {...props} label="Label" rightIconClass="u:i-material-symbols-search" />
            <TextField
                {...props}
                placeholder="Placeholder"
                rightIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                label="Label"
                placeholder="Placeholder"
                rightIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                leftIconClass="u:i-material-symbols-search"
                rightIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                label="Label"
                leftIconClass="u:i-material-symbols-search"
                rightIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                placeholder="Placeholder"
                leftIconClass="u:i-material-symbols-search"
                rightIconClass="u:i-material-symbols-search"
            />
            <TextField
                {...props}
                label="Label"
                placeholder="Placeholder"
                leftIconClass="u:i-material-symbols-search"
                rightIconClass="u:i-material-symbols-search"
            />
        </div>
    {/snippet}
</Story>
