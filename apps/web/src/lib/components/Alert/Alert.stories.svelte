<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import Alert from "./Alert.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Alert",
        component: Alert,
        tags: ["autodocs"],
        argTypes: disableControls("class", "onClose", "children")
    })
</script>

<Story name="Default" args={{ variant: "info" }}>Message</Story>
<Story name="Long text" args={{ variant: "info" }}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat ipsa beatae voluptatibus
    doloremque possimus, dolorem non dicta enim fugit similique?
</Story>
<Story name="All variants" argTypes={disableControls("variant")}>
    {#snippet template(props, ctx)}
        {@const variants = ctx.argTypes.variant?.options ?? []}
        <div class="u:flex u:flex-col u:gap-2">
            {#each variants as variant (variant)}
                <Alert {...props} {variant}>Message</Alert>
            {/each}
        </div>
    {/snippet}
</Story>
