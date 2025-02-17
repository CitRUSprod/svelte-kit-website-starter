<script lang="ts">
    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    let email = $state("")

    const vldResultEmail = $derived(vld.user.email(email))

    const qSendPasswordResetEmail = useQuery({
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
                disabled={qSendPasswordResetEmail.loading}
                label={$ll.email()}
                placeholder={$ll.enterEmail()}
                bind:value={email}
            />
        </div>
        <div>
            <Button
                disabled={!vldResultEmail.valid}
                loading={qSendPasswordResetEmail.loading}
                variant="primary"
                onclick={qSendPasswordResetEmail.refetch}
            >
                {$ll.sendResetLink()}
            </Button>
        </div>
    </div>
</Content.Center>
