<script lang="ts">
    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    let dialog = $state<Dialog>()

    let email = $state("")
    let password = $state("")
    let passwordConfirmation = $state("")

    const vldResultEmail = $derived(vld.user.email(email))
    const vldResultPassword = $derived(vld.user.password(password))
    const vldResultPasswordConfirmation = $derived(vld.user.password(passwordConfirmation))

    const completedForm = $derived(
        vldResultEmail.valid &&
            vldResultPassword.valid &&
            vldResultPassword.value === vldResultPasswordConfirmation.value
    )

    export function open() {
        email = ""
        password = ""
        passwordConfirmation = ""

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qLinkEmail = useQuery({
        fn() {
            return api.auth.link({
                email: vldResultEmail.value,
                password: vldResultPassword.value
            })
        },
        onSuccess() {
            toasts.add("success", $ll.confirmationEmailSent())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qLinkEmail.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.emailLinking()}</h1>
    </div>
    <div>
        <TextField autofocus disabled={qLinkEmail.loading} label={$ll.email()} bind:value={email} />
    </div>
    <div>
        <TextField
            disabled={qLinkEmail.loading}
            label={$ll.password()}
            type="password"
            bind:value={password}
        />
    </div>
    <div>
        <TextField
            disabled={qLinkEmail.loading}
            label={$ll.passwordConfirmation()}
            type="password"
            bind:value={passwordConfirmation}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qLinkEmail.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qLinkEmail.loading}
            variant="success"
            onclick={qLinkEmail.refetch}
        >
            {$ll.link()}
        </Button>
    </div>
</Dialog>
