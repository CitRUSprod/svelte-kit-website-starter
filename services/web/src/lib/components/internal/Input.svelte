<script lang="ts">
    import { onMount } from "svelte"

    export let type: string
    export let readonly: boolean
    export let autofocus: boolean
    export let value: string | number | null | undefined

    let input: HTMLInputElement

    onMount(() => {
        if (autofocus) {
            input.focus()
        }
    })
</script>

{#if type === "number"}
    <input
        bind:this={input}
        {readonly}
        type="number"
        bind:value
        {...$$restProps}
        on:keypress
        on:focus
        on:blur
    />
{:else}
    <input
        {...{ type }}
        bind:this={input}
        {readonly}
        bind:value
        {...$$restProps}
        on:keypress
        on:focus
        on:blur
    />
{/if}
