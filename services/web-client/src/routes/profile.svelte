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
    import { Button } from "$lib/components"

    import { session } from "$app/stores"
    import { sendVerificationEmail } from "$lib/utils/auth"
    import { messages } from "$lib/stores"

    let loading = false

    async function onSendVerificationEmail() {
        loading = true

        try {
            await sendVerificationEmail()
            messages.add("success", "Email was sent")
        } catch (err: any) {
            messages.add("error", err.response.message ?? err.message)
        }

        loading = false
    }
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
            <div><b>Verified:</b> {$session.user.verified ? "yes" : "no"}</div>
        </div>
        {#if !$session.user.verified}
            <div class="flex justify-center mt-5">
                <Button
                    class="btn-primary btn-outline"
                    loading="{loading}"
                    on:click="{onSendVerificationEmail}"
                >
                    Verify email
                </Button>
            </div>
        {/if}
    </div>
</div>
