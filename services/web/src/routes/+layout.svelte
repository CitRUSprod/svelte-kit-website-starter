<script lang="ts">
    import { PageProgressBar, ToastContainer } from "./_components"

    import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query"
    import { browser } from "$app/environment"
    import { darkTheme, user } from "$lib/stores"

    import type { LayoutData } from "./$types"

    import "uno.css"
    import "@unocss/reset/tailwind.css"

    export let data: LayoutData

    const client = new QueryClient()

    $: $user = data.user

    if (browser) {
        darkTheme.sync()
    }
</script>

<PageProgressBar />
<QueryClientProvider {client}>
    <slot />
</QueryClientProvider>
<ToastContainer />

<style global lang="postcss">
    html {
        @apply u\:overflow-x-hidden;
    }

    body {
        @apply u\:flex u\:flex-col u\:min-h-screen u\:bg-content u\:text-content-inverse u\:transition u\:duration-200 u\:overflow-x-hidden;
    }

    h1,
    h2,
    h3 {
        @apply u\:font-bold;
    }

    h1 {
        @apply u\:text-4xl;
    }

    h2 {
        @apply u\:text-2xl;
    }

    h3 {
        @apply u\:text-lg;
    }

    #app {
        @apply u\:contents;
    }
</style>
