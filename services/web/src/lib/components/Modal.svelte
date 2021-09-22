<script lang="ts">
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

<div>
    <input class="modal-toggle" type="checkbox" bind:checked={visible} />
    <div class="modal" on:click={hide}>
        <div class="modal-box {klass}" on:click|stopPropagation>
            <slot />
        </div>
    </div>
</div>
