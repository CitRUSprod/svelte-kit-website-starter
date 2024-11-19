<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let user: schemasModels.user.User

    let dialog: Dialog

    let email = ""

    $: vldResultEmail = vld.user.email(email)

    $: completedForm = vldResultEmail.valid && vldResultEmail.value !== user.email

    export function open() {
        email = user.email ?? ""

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcLinkEmail = createQueryController({
        fn() {
            return api.auth.link({
                email: vldResultEmail.value
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
        <TextField disabled={$qcLinkEmail.loading} label={$ll.email()} bind:value={email} />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcLinkEmail.loading} text variant="error" on:click={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcLinkEmail.loading}
            variant="success"
            on:click={qcLinkEmail.refresh}
        >
            {$ll.link()}
        </Button>
    </div>
</Dialog>
