<script lang="ts">
    import { Header, Footer } from "./_components"

    import type { LayoutData } from "./$types"

    export let data: LayoutData
</script>

<Header route={data.route} />
<main class="u:relative u:flex-1">
    <slot />
</main>
<Footer />
