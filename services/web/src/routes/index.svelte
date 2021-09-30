<script lang="ts">
    import { Button } from "$lib/components"

    import { toasts } from "$lib/stores"

    let count = 0

    function addOne() {
        count++
        toasts.add("success", `Count: ${count}`)
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div class="flex justify-center items-center h-full">
    <div class="border-primary rounded-lg border text-center p-8">
        <h1 class="text-4xl">SvelteKit Website Template</h1>
        <div class="flex justify-center mt-5">
            <Button class="btn-primary btn-outline" on:click={addOne}>
                Clicked: {count}
            </Button>
        </div>
    </div>
</div>
