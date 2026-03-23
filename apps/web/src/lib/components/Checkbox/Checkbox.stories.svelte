<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import Checkbox from "./Checkbox.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Checkbox",
        component: Checkbox,
        tags: ["autodocs"],
        argTypes: disableControls("class")
    })
</script>

<Story name="Default" />
<Story name="With label" args={{ label: "Agree to terms" }} />
<Story name="Checked" args={{ checked: true, label: "Checked checkbox" }} />
<Story name="Indeterminate" args={{ indeterminate: true, label: "Indeterminate state" }} />
<Story name="Disabled" args={{ disabled: true, label: "Disabled checkbox" }} />
<Story name="Readonly" args={{ readonly: true, checked: true, label: "Readonly" }} />
<Story name="All variants" argTypes={disableControls("variant")}>
    {#snippet template(props, ctx)}
        {@const variants = ctx.argTypes.variant?.options ?? []}
        <div class="u:flex u:flex-col u:gap-3">
            {#each variants as variant (variant)}
                <div class="u:flex u:gap-4">
                    <Checkbox {...props} {variant} label="unchecked" />
                    <Checkbox {...props} {variant} checked label="checked" />
                    <Checkbox {...props} {variant} indeterminate label="indeterminate" />
                </div>
            {/each}
        </div>
    {/snippet}
</Story>
<Story
    name="Different states"
    argTypes={disableControls("checked", "indeterminate", "disabled", "readonly")}
>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-3">
            <div>
                <h3 class="u:mb-2">Normal states</h3>
                <div class="u:flex u:gap-4">
                    <Checkbox {...props} label="Unchecked" />
                    <Checkbox {...props} checked label="Checked" />
                    <Checkbox {...props} indeterminate label="Indeterminate" />
                </div>
            </div>
            <div>
                <h3 class="u:mb-2">Disabled states</h3>
                <div class="u:flex u:gap-4">
                    <Checkbox {...props} disabled label="Disabled" />
                    <Checkbox {...props} disabled checked label="Disabled checked" />
                    <Checkbox {...props} disabled indeterminate label="Disabled indeterminate" />
                </div>
            </div>
            <div>
                <h3 class="u:mb-2">Readonly</h3>
                <div class="u:flex u:gap-4">
                    <Checkbox {...props} readonly label="Readonly" />
                    <Checkbox {...props} readonly checked label="Readonly checked" />
                    <Checkbox {...props} readonly indeterminate label="Readonly indeterminate" />
                </div>
            </div>
        </div>
    {/snippet}
</Story>
<Story name="Without label" argTypes={disableControls("label")}>
    {#snippet template(props)}
        <div class="u:flex u:items-center u:gap-4">
            <div class="u:text-center">
                <p class="u:mb-2 u:text-sm">Unchecked</p>
                <Checkbox {...props} />
            </div>
            <div class="u:text-center">
                <p class="u:mb-2 u:text-sm">Checked</p>
                <Checkbox {...props} checked />
            </div>
            <div class="u:text-center">
                <p class="u:mb-2 u:text-sm">Indeterminate</p>
                <Checkbox {...props} indeterminate />
            </div>
            <div class="u:text-center">
                <p class="u:mb-2 u:text-sm">Disabled</p>
                <Checkbox {...props} disabled />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="Checkbox group">
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-2">
            <h3 class="u:mb-2">Select interests:</h3>
            <Checkbox {...props} variant="primary" label="Programming" />
            <Checkbox {...props} variant="success" checked label="Design" />
            <Checkbox {...props} variant="info" label="Marketing" />
            <Checkbox {...props} variant="warning" indeterminate label="Analytics" />
            <Checkbox {...props} variant="error" label="Management" />
        </div>
    {/snippet}
</Story>
<Story name="With custom styles">
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4">
            <Checkbox {...props} class="u:text-lg" variant="primary" checked label="Large text" />
            <Checkbox {...props} class="u:text-xs" variant="success" label="Small text" />
            <Checkbox
                {...props}
                class="u:p-2 u:bg-gray-500 u:rounded"
                variant="info"
                label="With background"
            />
        </div>
    {/snippet}
</Story>
