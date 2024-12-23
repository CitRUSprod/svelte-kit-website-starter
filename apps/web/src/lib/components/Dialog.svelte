<script lang="ts">
    import { Dialog } from "bits-ui"

    import { fade, scale } from "svelte/transition"
    import cn from "classnames"

    import type { Snippet } from "svelte"

    interface Props {
        persistent?: boolean
        class?: string | undefined
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

<Dialog.Root closeOnEscape={!persistent} closeOnOutsideClick={!persistent} bind:open={visible}>
    <Dialog.Portal>
        <Dialog.Overlay
            class="u:fixed u:inset-0 u:bg-black u:bg-opacity-30 u:z-40"
            transition={fade}
        />
        <Dialog.Content
            class={cn(
                "u:fixed u:top-50% u:left-50% u:left-50% u:max-w-full u:p-8 u:bg-content u:shadow-md u:rounded-md u:translate--50% u:outline-none u:z-50",
                klass
            )}
            transition={scale}
        >
            {@render children?.()}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
