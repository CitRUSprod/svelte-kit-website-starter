<script lang="ts">
    import Button from "./Button.svelte"

    import { elementVariants } from "$lib/utils"

    import type { Hst as HstType } from "@histoire/plugin-svelte"
    import type * as types from "$lib/types"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export let Hst: HstType

    let variant: types.ElementVariant = "default"

    let content = "Button"
    let contentLink = "Link"
    let text = false
    let icon = false
    let disabled = false
    let loading = false
</script>

<svelte:component this={Hst.Story}>
    <svelte:component this={Hst.Variant} title="Default">
        <Button {disabled} {icon} {loading} {text} {variant}>{content}</Button>

        <svelte:fragment slot="controls">
            <svelte:component this={Hst.Text} title="Content" bind:value={content} />
            <svelte:component
                this={Hst.Select}
                options={elementVariants}
                title="Variant"
                bind:value={variant}
            />
            <svelte:component this={Hst.Checkbox} title="Text" bind:value={text} />
            <svelte:component this={Hst.Checkbox} title="Icon" bind:value={icon} />
            <svelte:component this={Hst.Checkbox} title="Disabled" bind:value={disabled} />
            <svelte:component this={Hst.Checkbox} title="Loading" bind:value={loading} />
        </svelte:fragment>
    </svelte:component>

    <svelte:component this={Hst.Variant} title="Link">
        <Button
            {disabled}
            href="https://google.com"
            {icon}
            {loading}
            rel="noopener noreferrer"
            target="_blank"
            {text}
            {variant}
        >
            {contentLink}
        </Button>

        <svelte:fragment slot="controls">
            <svelte:component this={Hst.Text} title="Content" bind:value={contentLink} />
            <svelte:component
                this={Hst.Select}
                options={elementVariants}
                title="Variant"
                bind:value={variant}
            />
            <svelte:component this={Hst.Checkbox} title="Text" bind:value={text} />
            <svelte:component this={Hst.Checkbox} title="Icon" bind:value={icon} />
            <svelte:component this={Hst.Checkbox} title="Disabled" bind:value={disabled} />
            <svelte:component this={Hst.Checkbox} title="Loading" bind:value={loading} />
        </svelte:fragment>
    </svelte:component>

    <svelte:component this={Hst.Variant} title="All variants">
        <div class="u:flex u:gap-1">
            {#each elementVariants as v (v)}
                <Button {disabled} {loading} {text} variant={v}>{v}</Button>
            {/each}
        </div>

        <svelte:fragment slot="controls">
            <svelte:component this={Hst.Checkbox} title="Text" bind:value={text} />
            <svelte:component this={Hst.Checkbox} title="Disabled" bind:value={disabled} />
            <svelte:component this={Hst.Checkbox} title="Loading" bind:value={loading} />
        </svelte:fragment>
    </svelte:component>

    <svelte:component this={Hst.Variant} title="All variants with icons">
        <div class="u:flex u:gap-1">
            {#each elementVariants as v (v)}
                <Button {disabled} icon {loading} {text} variant={v}>
                    <i class="u:i-fa-solid-exclamation-triangle" />
                </Button>
            {/each}
        </div>

        <svelte:fragment slot="controls">
            <svelte:component this={Hst.Checkbox} title="Text" bind:value={text} />
            <svelte:component this={Hst.Checkbox} title="Disabled" bind:value={disabled} />
            <svelte:component this={Hst.Checkbox} title="Loading" bind:value={loading} />
        </svelte:fragment>
    </svelte:component>
</svelte:component>
