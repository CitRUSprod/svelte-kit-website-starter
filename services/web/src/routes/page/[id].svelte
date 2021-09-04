<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ page }) => {
        const { id } = page.params
        return { props: { id } }
    }
</script>

<script lang="ts">
    export let id: string
</script>

<svelte:head>
    <title>Page {id}</title>
</svelte:head>

<h1 class="text-4xl">Page {id}</h1>
