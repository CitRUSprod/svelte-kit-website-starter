<script lang="ts">
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField } from "$lib/components"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"

    const { data } = $props()

    let newPassword = $state("")
    let newPasswordConfirmation = $state("")

    const vldResultNewPassword = $derived(vld.user.password(newPassword))
    const vldResultNewPasswordConfirmation = $derived(vld.user.password(newPasswordConfirmation))

    const completedForm = $derived(
        vldResultNewPassword.valid &&
            vldResultNewPassword.value === vldResultNewPasswordConfirmation.value
    )

    const qcResetPassword = createQueryController({
        fn() {
            return api.profile.resetPassword({
                passwordResetToken: data.token,
                newPassword: vldResultNewPassword.value
            })
        },
        async onSuccess() {
            toasts.add("success", $ll.passwordResetSuccessfully())
            await goto($localePath("/auth/login"))
        }
    })
</script>

<svelte:head>
    <title>{$ll.passwordReset()}</title>
</svelte:head>

<Content.Center>
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.passwordReset()}</h1>
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$ll.newPassword()}
                placeholder={$ll.enterNewPassword()}
                type="password"
                bind:value={newPassword}
            />
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$ll.newPasswordConfirmation()}
                placeholder={$ll.enterNewPasswordAgain()}
                type="password"
                bind:value={newPasswordConfirmation}
            />
        </div>
        <div>
            <Button
                disabled={!completedForm}
                loading={$qcResetPassword.loading}
                variant="primary"
                onclick={qcResetPassword.refresh}
            >
                {$ll.reset()}
            </Button>
        </div>
    </div>
</Content.Center>
