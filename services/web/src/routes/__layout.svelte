<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { theme, pageLoading } from "$lib/stores"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = () => {
        if (browser) {
            theme.sync()
        }

        return {}
    }
</script>

<script lang="ts">
    import {
        ThePageProgressBar,
        TheHeader,
        TheContent,
        ThePageLoader,
        TheToastContainer
    } from "./_components"

    import { onMount } from "svelte"

    onMount(() => {
        setTimeout(() => {
            $pageLoading = false
        }, 500)
    })
</script>

<ThePageProgressBar />
<TheHeader />
<TheContent>
    <slot />
</TheContent>
{#if $pageLoading}
    <ThePageLoader />
{/if}
<TheToastContainer />

<style lang="postcss" global>
    @import "tailwindcss/tailwind";
    @import "overlayscrollbars/css/OverlayScrollbars.min";

    .break-text {
        word-break: break-word;
    }
</style>
