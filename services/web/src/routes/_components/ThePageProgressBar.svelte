<script lang="ts">
    import { navigating } from "$app/stores"
    import NProgress from "nprogress"

    NProgress.configure({
        showSpinner: false
    })

    function watchForChanging(changing: boolean) {
        if (changing) {
            NProgress.start()
        } else {
            NProgress.done()
        }
    }

    $: watchForChanging(!!$navigating)
</script>

{#if false}
    <div />
{/if}

<style lang="postcss" global>
    #nprogress {
        @apply pointer-events-none;

        .bar {
            @apply fixed top-0 left-0 w-full h-[2px] bg-green-500 z-[1000];
        }
    }
</style>
