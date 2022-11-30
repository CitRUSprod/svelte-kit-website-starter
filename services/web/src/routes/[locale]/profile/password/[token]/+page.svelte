<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { goto } from "$app/navigation"
    import { localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    let newPassword = ""
    let newPasswordConfirmation = ""

    $: vldResultNewPassword = vld.user.password(newPassword)
    $: vldResultNewPasswordConfirmation = vld.user.password(newPasswordConfirmation)

    $: completedForm =
        vldResultNewPassword.valid &&
        vldResultNewPassword.value === vldResultNewPasswordConfirmation.value

    const queryResetPassword = useQuery("profile.resetPassword", {
        async queryFn() {
            const res = await api.profile.resetPassword({
                passwordResetToken: data.token,
                newPassword: vldResultNewPassword.value
            })
            return res.data
        },
        async onSuccess() {
            toasts.add("success", "Password has been successfully reset")
            await goto($localePath("/auth/login"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {})
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
                disabled={$queryResetPassword.isFetching}
                label="New password"
                placeholder="Enter a new password..."
                valueType="password"
                bind:value={newPassword}
            />
        </div>
        <div>
            <TextField
                disabled={$queryResetPassword.isFetching}
                label="New password confirmation"
                placeholder="Enter a new password again..."
                valueType="password"
                bind:value={newPasswordConfirmation}
            />
        </div>
        <div>
            <Button
                disabled={!completedForm}
                loading={$queryResetPassword.isFetching}
                type="primary"
                on:click={() => $queryResetPassword.refetch()}
            >
                Reset
            </Button>
        </div>
    </div>
</Content.Center>
