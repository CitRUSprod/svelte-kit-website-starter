<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { darkTheme } from "$lib/stores"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = () => {
        if (browser) {
            darkTheme.sync()
        }

        return {}
    }
</script>

<script lang="ts">
    import { PageProgressBar, Header, Content, ToastContainer } from "./_components"
</script>

<PageProgressBar />
<Header />
<Content>
    <slot />
</Content>
<ToastContainer />

<style lang="postcss" global>
    @import "tailwindcss/tailwind";
    @import "overlayscrollbars/css/OverlayScrollbars.min";

    .break-text {
        word-break: break-word;
    }
</style>
