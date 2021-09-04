<script lang="ts">
    export let href: string | undefined = undefined
    export let disabled = false
    export let loading = false

    let klass = ""

    export { klass as class }
</script>

<button class="btn {loading ? 'loading' : ''} relative {klass}" {disabled} on:click>
    <slot />
    {#if href !== undefined && !disabled && !loading}
        <!-- svelte-ignore a11y-missing-content -->
        <a class="h-full w-full top-0 left-0 block absolute" {href} />
    {/if}
</button>
