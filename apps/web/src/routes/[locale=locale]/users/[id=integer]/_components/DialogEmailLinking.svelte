<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

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

    const qcLinkEmail = createQueryController({
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
    persistent={$qcLinkEmail.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.emailLinking()}</h1>
    </div>
    <div>
        <TextField
            autofocus
            disabled={$qcLinkEmail.loading}
            label={$ll.email()}
            bind:value={email}
        />
    </div>
    <div>
        <TextField
            disabled={$qcLinkEmail.loading}
            label={$ll.password()}
            type="password"
            bind:value={password}
        />
    </div>
    <div>
        <TextField
            disabled={$qcLinkEmail.loading}
            label={$ll.passwordConfirmation()}
            type="password"
            bind:value={passwordConfirmation}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcLinkEmail.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcLinkEmail.loading}
            variant="success"
            onclick={qcLinkEmail.refresh}
        >
            {$ll.link()}
        </Button>
    </div>
</Dialog>
