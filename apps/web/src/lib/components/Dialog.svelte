<script lang="ts">
    import { Dialog } from "bits-ui"
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"
    import { fade, scale } from "svelte/transition"

    interface Props {
        persistent?: boolean
        class?: ClassValue
        children?: Snippet
    }

    const { persistent = false, class: klass = undefined, children }: Props = $props()

    let visible = $state(false)

    export function open() {
        visible = true
    }

    export function close() {
        visible = false
    }
</script>

<Dialog.Root bind:open={visible}>
    <Dialog.Trigger />
    <Dialog.Portal>
        <Dialog.Overlay forceMount>
            {#snippet child({ props, open: o })}
                {#if o}
                    <div
                        class="u:fixed u:inset-0 u:bg-black u:bg-opacity-30 u:z-40"
                        transition:fade
                        {...props}
                    ></div>
                {/if}
            {/snippet}
        </Dialog.Overlay>
        <Dialog.Content
            interactOutsideBehavior={persistent ? "ignore" : "close"}
            escapeKeydownBehavior={persistent ? "ignore" : "close"}
            forceMount
        >
            {#snippet child({ props, open: o })}
                {#if o}
                    <div
                        class={[
                            "u:fixed u:top-50% u:left-50% u:left-50% u:max-w-full u:p-8 u:bg-content u:shadow-md u:rounded-md u:translate--50% u:outline-none u:z-50",
                            klass
                        ]}
                        transition:scale
                        {...props}
                    >
                        {@render children?.()}
                    </div>
                {/if}
            {/snippet}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
