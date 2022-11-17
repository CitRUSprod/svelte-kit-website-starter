<script lang="ts">
    import { onDestroy } from "svelte"
    import NProgress from "nprogress"
    import { beforeNavigate, afterNavigate } from "$app/navigation"

    NProgress.configure({
        showSpinner: false
    })

    beforeNavigate(() => {
        NProgress.start()
    })

    afterNavigate(() => {
        NProgress.done()
    })

    onDestroy(() => {
        NProgress.done()
    })
</script>

{#if false}
    <div />
{/if}

<!-- eslint-disable @ota-meshi/svelte/valid-compile -->
<style global lang="postcss">
    #nprogress {
        @apply u\:pointer-events-none;
    }

    #nprogress .bar {
        @apply u\:fixed u\:top-0 u\:left-0 u\:w-full u\:h-0.5 u\:bg-green-500 u\:z-1000;
    }
</style>
