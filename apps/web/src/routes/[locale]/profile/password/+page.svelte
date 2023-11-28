<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = ""

    $: vldResultEmail = vld.user.email(email)

    const qcSendPasswordResetEmail = createQueryController({
        fn() {
            return api.profile.sendPasswordResetEmail({
                email: vldResultEmail.value
            })
        },
        onSuccess() {
            toasts.add("success", $t("routes.profile.password.reset-link-sent"))
        }
    })
</script>

<svelte:head>
    <title>{$t("routes.profile.password.password-reset")}</title>
</svelte:head>

<Content.Center>
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$t("routes.profile.password.password-reset")}</h1>
        </div>
        <div>
            <TextField
                disabled={$qcSendPasswordResetEmail.loading}
                label={$t("routes.profile.password.email")}
                placeholder={$t("routes.profile.password.enter-email")}
                bind:value={email}
            />
        </div>
        <div>
            <Button
                disabled={!vldResultEmail.valid}
                loading={$qcSendPasswordResetEmail.loading}
                variant="primary"
                on:click={qcSendPasswordResetEmail.refresh}
            >
                {$t("routes.profile.password.send-reset-link")}
            </Button>
        </div>
    </div>
</Content.Center>
