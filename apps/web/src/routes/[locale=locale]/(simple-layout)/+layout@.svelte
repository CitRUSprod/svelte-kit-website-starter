<script lang="ts">
    interface Props {
        children?: import("svelte").Snippet
    }

    const { children }: Props = $props()
</script>

<main class="u:relative u:flex-1">
    {@render children?.()}
</main>
