<script lang="ts">
    import { ThePageProgressBar, TheHeader, TheContent } from "./_components"

    import { browser } from "$app/env"
    import { theme } from "$lib/stores"

    if (browser) {
        theme.sync()
    }
</script>

<ThePageProgressBar />
<TheHeader />
<TheContent>
    <slot />
</TheContent>

<style lang="postcss" global>
    @import "tailwindcss/tailwind";
</style>
