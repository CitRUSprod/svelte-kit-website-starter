<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    export const load: Load = ({ session }) => {
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
    import { session } from "$app/stores"
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>
<div class="flex justify-center items-center h-full">
    <div class="border-primary rounded-lg border text-center p-8">
        <h1 class="text-4xl">Profile</h1>
        <div class="mt-4">
            <div><b>Email:</b> {$session.user.email}</div>
            <div><b>Username:</b> {$session.user.username}</div>
        </div>
    </div>
</div>
