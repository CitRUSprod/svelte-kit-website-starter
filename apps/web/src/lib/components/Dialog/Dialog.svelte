<script lang="ts">
    import { Dialog } from "bits-ui"
    import { watch } from "runed"
    import type { Snippet } from "svelte"
    import { onMount } from "svelte"
    import type { ClassValue } from "svelte/elements"
    import { fade, scale } from "svelte/transition"

    import { Button } from "../Button"

    import type { DialogId } from "$lib/stores"
    import { dialogStack } from "$lib/stores"
    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        contentClass?: ClassValue
        title?: string
        persistent?: boolean
        closable?: boolean
        children?: Snippet
    }

    const {
        class: klass = undefined,
        contentClass = undefined,
        title = undefined,
        persistent = false,
        closable = true,
        children = undefined,
        ...rest
    }: Props = $props()

    let visible = $state(false)
    let dialogId: DialogId
    let isActive = $state(true)

    onMount(() => {
        dialogId = dialogStack.registerDialog()
    })

    watch(
        () => dialogStack.activeDialogId,
        id => {
            isActive = dialogId === id
        }
    )

    export function open() {
        visible = true
        dialogStack.pushDialog(dialogId)
    }

    export function close() {
        visible = false
        dialogStack.popDialog()
    }

    function handleOverlayClick(e: MouseEvent) {
        if (!persistent && e.target === e.currentTarget) {
            close()
        }
    }
</script>

<Dialog.Root
    bind:open={visible}
    onOpenChange={open => {
        if (!open) {
            dialogStack.popDialog()
        }
    }}
>
    <Dialog.Trigger />
    <Dialog.Portal>
        <Dialog.Overlay forceMount>
            {#snippet child({ props, open: o })}
                {#if o && isActive}
                    <div
                        class="u:fixed u:inset-0 u:bg-black u:bg-opacity-30 u:z-1000"
                        onclick={handleOverlayClick}
                        transition:fade
                        {...props}
                    ></div>
                {/if}
            {/snippet}
        </Dialog.Overlay>
        <Dialog.Content
            interactOutsideBehavior="ignore"
            escapeKeydownBehavior={persistent ? "ignore" : "close"}
            forceMount
        >
            {#snippet child({ props, open: o })}
                {#if o && isActive}
                    <div
                        class={[
                            "u:fixed u:top-50% u:left-50% u:left-50% u:max-w-full u:max-h-full u:p-8 u:bg-default u:shadow-md u:rounded-md u:translate--50% u:outline-none u:overflow-auto u:z-1000",
                            klass
                        ]}
                        transition:scale
                        {...props}
                        {...rest}
                    >
                        <div class="u:flex u:justify-between u:gap-4 u:pb-4">
                            <div class="u:flex-1 u:min-w-0">
                                <h2 class="u:break-words u:whitespace-normal">
                                    {title}
                                </h2>
                            </div>
                            {#if closable}
                                <div>
                                    <Button icon disabled={persistent} onClick={close}>
                                        <i class="u:i-mdi-close"></i>
                                    </Button>
                                </div>
                            {/if}
                        </div>
                        <div class={contentClass}>
                            {@render children?.()}
                        </div>
                    </div>
                {/if}
            {/snippet}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
