<script lang="ts">
    import Modal from "./Modal.svelte"

    export let title: string
    export let visible: boolean
    export let persistent = false
</script>

<Modal class="space-y-2" {persistent} bind:visible>
    <h1 class="text-2xl">{title}</h1>
    <slot />
    <div class="grid grid-cols-2 gap-2 !mt-6">
        <slot name="actions" />
    </div>
</Modal>
