<script lang="ts">
    import { fade, scale } from "svelte/transition"
    import { createDialog, melt } from "@melt-ui/svelte"
    import cn from "classnames"

    let klass: string | undefined = undefined
    export { klass as class }

    const {
        elements: { portalled, overlay, content },
        states: { open: visible }
    } = createDialog({
        closeOnEscape: false,
        closeOnOutsideClick: false
    })

    export function open() {
        $visible = true
    }

    export function close() {
        $visible = false
    }
</script>

<div use:melt={$portalled}>
    {#if $visible}
        <div
            class="u:fixed u:inset-0 u:bg-black u:bg-opacity-30 u:z-40"
            use:melt={$overlay}
            transition:fade
        />
        <div
            class={cn(
                "u:fixed u:top-50% u:left-50% u:left-50% u:p-8 u:bg-content u:shadow-md u:rounded-md u:translate--50% u:z-50",
                klass
            )}
            use:melt={$content}
            transition:scale
        >
            <slot />
        </div>
    {/if}
</div>
