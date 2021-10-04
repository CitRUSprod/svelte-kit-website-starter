<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { theme } from "$lib/stores"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = () => {
        if (browser) {
            theme.sync()
        }

        return {}
    }
</script>

<script lang="ts">
    import { ThePageProgressBar, TheHeader, TheContent, TheToastContainer } from "./_components"
</script>

<ThePageProgressBar />
<TheHeader />
<TheContent>
    <slot />
</TheContent>
<TheToastContainer />

<style lang="postcss" global>
    @import "tailwindcss/tailwind";
    @import "overlayscrollbars/css/OverlayScrollbars.min";

    .break-text {
        word-break: break-word;
    }
</style>
