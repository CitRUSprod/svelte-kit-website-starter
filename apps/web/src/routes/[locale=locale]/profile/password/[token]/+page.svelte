<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let data

    let newPassword = ""
    let newPasswordConfirmation = ""

    $: vldResultNewPassword = vld.user.password(newPassword)
    $: vldResultNewPasswordConfirmation = vld.user.password(newPasswordConfirmation)

    $: completedForm =
        vldResultNewPassword.valid &&
        vldResultNewPassword.value === vldResultNewPasswordConfirmation.value

    const qcResetPassword = createQueryController({
        fn() {
            return api.profile.resetPassword({
                passwordResetToken: data.token,
                newPassword: vldResultNewPassword.value
            })
        },
        async onSuccess() {
            toasts.add("success", $ll.$.$profile.$password.$_token.passwordResetSuccessfully())
            await goto($localePath("/auth/login"))
        }
    })
</script>

<svelte:head>
    <title>{$ll.$.$profile.$password.$_token.passwordReset()}</title>
</svelte:head>

<Content.Center>
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.$.$profile.$password.$_token.passwordReset()}</h1>
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$ll.$.$profile.$password.$_token.newPassword()}
                placeholder={$ll.$.$profile.$password.$_token.enterNewPassword()}
                type="password"
                bind:value={newPassword}
            />
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$ll.$.$profile.$password.$_token.newPasswordConfirmation()}
                placeholder={$ll.$.$profile.$password.$_token.enterNewPasswordAgain()}
                type="password"
                bind:value={newPasswordConfirmation}
            />
        </div>
        <div>
            <Button
                disabled={!completedForm}
                loading={$qcResetPassword.loading}
                variant="primary"
                on:click={qcResetPassword.refresh}
            >
                {$ll.$.$profile.$password.$_token.reset()}
            </Button>
        </div>
    </div>
</Content.Center>
