<script lang="ts">
    import { ThePageProgressBar, TheHeader, TheContent, TheToastContainer } from "./_components"

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
<TheToastContainer />

<style lang="postcss" global>
    @import "tailwindcss/tailwind";
</style>
