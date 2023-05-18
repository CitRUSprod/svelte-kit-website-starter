<script lang="ts">
    import { Alert } from "$lib/components"

    import { fly, fade } from "svelte/transition"
    import { toasts } from "$lib/stores"
</script>

<div class="u:fixed u:right-3 u:bottom-2 u:flex u:flex-col-reverse u:w-80 u:text-white u:z-1000">
    {#each $toasts as toast (toast.id)}
        <div in:fly|local={{ y: -200, duration: 500 }} out:fade|local>
            <Alert
                class="u:my-1 u:shadow-md u:select-none"
                closable
                type={toast.type}
                on:close={() => toasts.remove(toast.id)}
            >
                {toast.text}
            </Alert>
        </div>
    {/each}
</div>
