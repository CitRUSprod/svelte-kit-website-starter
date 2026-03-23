<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import TextArea from "./TextArea.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/TextArea",
        component: TextArea,
        tags: ["autodocs"],
        argTypes: disableControls("class", "onInput", "onFocus", "onBlur", "onKeyPress")
    })
</script>

<Story name="Default" />
<Story name="Label and placeholder" argTypes={disableControls("label", "placeholder")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-2">
            <TextArea {...props} />
            <TextArea {...props} label="Label" />
            <TextArea {...props} placeholder="Placeholder" />
            <TextArea {...props} label="Label" placeholder="Placeholder" />
        </div>
    {/snippet}
</Story>
