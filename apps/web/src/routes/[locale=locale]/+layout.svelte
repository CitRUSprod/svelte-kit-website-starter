<script lang="ts">
    import type { Snippet } from "svelte"

    import { Header, Footer } from "./_components"

    interface Props {
        children?: Snippet
    }

    const { children }: Props = $props()
</script>

<Header />
<main class="u:relative u:flex-1">
    {@render children?.()}
</main>
<Footer />
