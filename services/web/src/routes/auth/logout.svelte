<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { session } from "$app/stores"
    import { toasts } from "$lib/stores"
    import { Auth } from "$lib/services"

    async function logout() {
        try {
            await Auth.logout()
            $session.user = null
            goto("/", { replaceState: true })
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }
    }

    if (browser) {
        logout()
    }
</script>

<svelte:head>
    <title>Redirecting...</title>
</svelte:head>

<h1 class="text-4xl">Redirecting...</h1>
