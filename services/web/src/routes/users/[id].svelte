<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { axios, getRoleName } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User } from "$lib/types"

    export const load: Load<{ session: Session }> = async ({ session, page }) => {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            const { id } = page.params

            try {
                const { data } = await axios.get<User>(`/api/users/${id}`)
                return { props: { user: data } }
            } catch (err: unknown) {
                goto("/", { replaceState: true })
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import { DateTime } from "luxon"

    export let user: User | null = null
</script>

<svelte:head>
    <title>User Profile</title>
</svelte:head>

{#if user}
    <h1 class="text-4xl">User Profile</h1>
    <div class="mt-4 space-y-1">
        <div><b>Username:</b> {user.username}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Role:</b> {getRoleName(user.role)}</div>
        <div>
            <b>Registration date:</b>
            {DateTime.fromISO(user.createdAt).toFormat("LLLL d, yyyy")}
        </div>
    </div>
{/if}
