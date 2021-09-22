<script lang="ts">
    import { fade } from "svelte/transition"

    export let visible: boolean
    export let persistent = false

    let klass = ""
    export { klass as class }

    function hide() {
        if (!persistent) {
            visible = false
        }
    }
</script>

{#if visible}
    <div class="fixed top-0 left-0 w-full h-full z-[1000]" transition:fade>
        <input class="modal-toggle" type="checkbox" bind:checked={visible} />
        <div class="modal" on:click={hide}>
            <div class="modal-box {klass}" on:click|stopPropagation>
                <slot />
            </div>
        </div>
    </div>
{/if}
