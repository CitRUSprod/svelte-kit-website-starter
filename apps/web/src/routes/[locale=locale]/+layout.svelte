<script lang="ts">
    import { Header, Footer } from "./_components"
    interface Props {
        children?: import("svelte").Snippet
    }

    const { children }: Props = $props()
</script>

<Header />
<main class="u:relative u:flex-1">
    {@render children?.()}
</main>
<Footer />
