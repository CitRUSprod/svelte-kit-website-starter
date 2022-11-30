<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { toasts, userData } from "$lib/stores"
    import { dt } from "$lib/utils"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    const querySendConfirmationEmail = useQuery("profile.sendConfirmationEmail", {
        async queryFn() {
            const res = await api.profile.sendConfirmationEmail()
            return res.data
        },
        onSuccess() {
            toasts.add("success", "A confirmation email was sent to your email address")
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {
        $querySendConfirmationEmail.remove()
    })
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<Content.Default title="Profile">
    <div>
        <ul>
            <li><b>Username:</b> {data.user.username}</li>
            {#if data.user.email}
                <li><b>Email:</b> {data.user.email}</li>
            {/if}
            <li><b>Role:</b> {data.user.role.name}</li>
            <li><b>Confirmed email:</b> {data.user.confirmedEmail ? "yes" : "no"}</li>
            <li><b>Banned:</b> {data.user.banned ? "yes" : "no"}</li>
            <li><b>Registration date:</b> {dt.getFullDateAndTime(data.user.registrationDate)}</li>
        </ul>
    </div>
    {#if $userData}
        <div>
            {#if !$userData.confirmedEmail}
                <Button
                    loading={$querySendConfirmationEmail.isFetching}
                    type="success"
                    on:click={() => $querySendConfirmationEmail.refetch()}
                >
                    Verify email
                </Button>
            {/if}
        </div>
    {/if}
</Content.Default>
