<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ page }) => {
        const { token } = page.params
        return { props: { token } }
    }
</script>

<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { verifyEmail } from "$lib/utils/auth"

    export let token: string

    if (browser) {
        verifyEmail(token).then(() => {
            goto("/", { replaceState: true })
        })
    }
</script>

<svelte:head>
    <title>Redirecting...</title>
</svelte:head>

<h1 class="text-4xl">Redirecting...</h1>
