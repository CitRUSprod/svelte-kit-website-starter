<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import Button from "./Button.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Button",
        component: Button,
        tags: ["autodocs"],
        argTypes: disableControls("class", "onClick", "children")
    })
</script>

<Story name="Default">Button</Story>
<Story name="All variants + All sizes" argTypes={disableControls("variant", "size", "icon")}>
    {#snippet template(props, ctx)}
        {@const variants = ctx.argTypes.variant?.options ?? []}
        {@const sizes = ctx.argTypes.size?.options ?? []}
        <div class="u:flex u:flex-col u:gap-2">
            {#each sizes as size (size)}
                <div class="u:flex u:gap-2">
                    {#each variants as variant (variant)}
                        <Button {...props} {variant} {size}>{variant}</Button>
                    {/each}
                </div>
            {/each}
        </div>
    {/snippet}
</Story>
<Story
    name="With icon + All variants + All sizes"
    argTypes={disableControls("variant", "size", "icon")}
>
    {#snippet template(props, ctx)}
        {@const variants = ctx.argTypes.variant?.options ?? []}
        {@const sizes = ctx.argTypes.size?.options ?? []}
        <div class="u:flex u:flex-col u:gap-2">
            {#each sizes as size (size)}
                <div class="u:flex u:gap-2">
                    {#each variants as variant (variant)}
                        <Button {...props} {variant} {size} icon>
                            <i class="u:i-mdi-pencil"></i>
                        </Button>
                    {/each}
                </div>
            {/each}
        </div>
    {/snippet}
</Story>
