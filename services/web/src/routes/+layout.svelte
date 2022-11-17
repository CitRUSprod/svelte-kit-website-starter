<script lang="ts">
    import { PageProgressBar, ToastContainer } from "./_components"

    import { browser } from "$app/environment"
    import { darkTheme } from "$lib/stores"

    import "uno.css"
    import "@unocss/reset/tailwind.css"

    if (browser) {
        darkTheme.sync()
    }
</script>

<PageProgressBar />
<slot />
<ToastContainer />

<!-- eslint-disable @ota-meshi/svelte/valid-compile -->
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
</style>
