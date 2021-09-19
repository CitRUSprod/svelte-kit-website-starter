<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { Role } from "$lib/enums"
    import { axios, hasAccess } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User } from "$lib/types"

    export const load: Load<{ session: Session }> = async ({ session }) => {
        if (!hasAccess(session.user, Role.Admin)) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            const { data } = await axios.get<Array<User>>("/api/users")
            return { props: { users: data } }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    export let users: Array<User> = []
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<h1 class="text-4xl">Users</h1>
<div class="mt-4 overflow-x-auto">
    <table class="table w-full">
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user (user.id)}
                <tr>
                    <th>{user.id}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </tr>
            {:else}
                <tr>
                    <td class="text-center" colspan="4">Empty</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
