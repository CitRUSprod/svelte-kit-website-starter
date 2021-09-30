<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        return {}
    }
</script>

<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { session, toasts } from "$lib/stores"
    import { axios, socket } from "$lib/utils"

    async function logout() {
        try {
            await axios.post("/api/auth/logout")
            $session.user = null
            socket.disconnect().connect()
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
