<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = ""

    $: vldResultEmail = vld.user.email(email)

    const querySendPasswordResetEmail = useQuery("profile.sendPasswordResetEmail", {
        async queryFn() {
            const res = await api.profile.sendPasswordResetEmail({
                email: vldResultEmail.value
            })
            return res.data
        },
        onSuccess() {
            toasts.add("success", "A reset link was sent to your email address")
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
        $querySendPasswordResetEmail.remove()
    })
</script>

<svelte:head>
    <title>Password reset</title>
</svelte:head>

<Content.Center>
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>Password reset</h1>
        </div>
        <div>
            <TextField
                disabled={$querySendPasswordResetEmail.isFetching}
                label="Email"
                placeholder="Enter email..."
                bind:value={email}
            />
        </div>
        <div>
            <Button
                disabled={!vldResultEmail.valid}
                loading={$querySendPasswordResetEmail.isFetching}
                type="primary"
                on:click={() => $querySendPasswordResetEmail.refetch()}
            >
                Send reset link
            </Button>
        </div>
    </div>
</Content.Center>
