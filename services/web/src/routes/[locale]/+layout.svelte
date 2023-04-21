<script lang="ts">
    import { Header, Footer } from "./_components"

    export let data
</script>

<Header route={data.route} />
<main class="u:relative u:flex-1">
    <slot />
</main>
<Footer />
