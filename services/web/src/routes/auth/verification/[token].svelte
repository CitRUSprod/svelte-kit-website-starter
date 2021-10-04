<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ page }) => ({
        props: {
            token: page.params.token
        }
    })
</script>

<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"
    import { ky } from "$lib/utils"

    export let token: string

    async function verify() {
        try {
            await ky.put("api/auth/verification", { json: { token } })
            toasts.add("success", "Email successfully verified")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        goto("/", { replaceState: true })
    }

    if (browser) {
        verify()
    }
</script>

<svelte:head>
    <title>Redirecting...</title>
</svelte:head>

<h1 class="text-4xl">Redirecting...</h1>
