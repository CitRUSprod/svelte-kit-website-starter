<script lang="ts">
    import { Button, Icon } from "$lib/components"

    import { fly, fade } from "svelte/transition"
    import { toasts } from "$lib/stores"

    const { list } = toasts

    function getIconByType(type: string) {
        switch (type) {
            case "success":
                return Icon.Success
            case "error":
                return Icon.Error
            case "warning":
                return Icon.Warning
            default:
                return Icon.Info
        }
    }
</script>

<div class="fixed right-4 bottom-3 flex flex-col-reverse w-80 text-white z-[1000]">
    {#each $list as toast (toast.id)}
        <div
            class="alert flex-row justify-center my-1 bg-opacity-20 rounded-lg select-none {[
                'alert-success',
                'alert-error',
                'alert-warning',
                'alert-info'
            ].find(c => c.endsWith(toast.type))}"
            in:fly={{ y: -200, duration: 500 }}
            out:fade
        >
            <div>
                <svelte:component this={getIconByType(toast.type)} />
            </div>
            <div class="flex-grow px-3">
                <div class="break-text">{toast.text}</div>
            </div>
            <div>
                <Button
                    class="btn-ghost btn-circle btn-sm"
                    on:click={() => toasts.remove(toast.id)}
                >
                    <Icon.Close />
                </Button>
            </div>
        </div>
    {/each}
</div>
