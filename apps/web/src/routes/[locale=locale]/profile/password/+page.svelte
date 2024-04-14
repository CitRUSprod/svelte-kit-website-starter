<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { ll } from "$i18n/helpers"
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
            toasts.add("success", $ll.resetLinkSent())
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
                disabled={$qcSendPasswordResetEmail.loading}
                label={$ll.email()}
                placeholder={$ll.enterEmail()}
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
                {$ll.sendResetLink()}
            </Button>
        </div>
    </div>
</Content.Center>
