<script lang="ts">
    import type { Snippet } from "svelte"

    interface Props {
        children?: Snippet
    }

    const { children }: Props = $props()
</script>

<main class="u:relative u:flex-1">
    {@render children?.()}
</main>
