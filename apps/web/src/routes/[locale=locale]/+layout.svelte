<script lang="ts">
    import { Header, Footer } from "./_components"

    import type { Snippet } from "svelte"

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
