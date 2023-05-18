<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
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
            toasts.add("success", $t("routes.profile.password.[token].password-reset-successfully"))
            await goto($localePath("/auth/login"))
        }
    })
</script>

<svelte:head>
    <title>{$t("routes.profile.password.[token].password-reset")}</title>
</svelte:head>

<Content.Center>
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$t("routes.profile.password.[token].password-reset")}</h1>
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$t("routes.profile.password.[token].new-password")}
                placeholder={$t("routes.profile.password.[token].enter-new-password")}
                valueType="password"
                bind:value={newPassword}
            />
        </div>
        <div>
            <TextField
                disabled={$qcResetPassword.loading}
                label={$t("routes.profile.password.[token].new-password-confirmation")}
                placeholder={$t("routes.profile.password.[token].enter-new-password-again")}
                valueType="password"
                bind:value={newPasswordConfirmation}
            />
        </div>
        <div>
            <Button
                disabled={!completedForm}
                loading={$qcResetPassword.loading}
                type="primary"
                on:click={qcResetPassword.refresh}
            >
                {$t("routes.profile.password.[token].reset")}
            </Button>
        </div>
    </div>
</Content.Center>
