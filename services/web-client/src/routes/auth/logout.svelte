<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { session } from "$app/stores"
    import { logout } from "$lib/utils/auth"

    if (browser) {
        logout().then(() => {
            $session.user = null
            goto("/", { replaceState: true })
        })
    }
</script>

<svelte:head>
    <title>Redirecting...</title>
</svelte:head>

<h1 class="text-4xl">Redirecting...</h1>
