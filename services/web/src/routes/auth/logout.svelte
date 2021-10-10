<script lang="ts" context="module">
    import { fetchy, HttpError, socket, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (!session.user) {
            return createRedirectResponse("/")
        }

        return {}
    }
</script>

<script lang="ts">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { session, toasts } from "$lib/stores"

    async function logout() {
        try {
            await fetchy.post("/api/auth/logout")
            $session.user = null
            socket.disconnect().connect()
            goto("/", { replaceState: true })
        } catch (err: unknown) {
            if (err instanceof HttpError) {
                const data = await err.response.json()
                toasts.add("error", data.message)
            } else {
                console.error(err)
            }
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
