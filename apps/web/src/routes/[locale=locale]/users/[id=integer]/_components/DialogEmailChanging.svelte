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

    const qcUpdateEmail = createQueryController({
        fn() {
            return api.profile.sendEmailUpdateEmailToOld({
                email: vldResultEmail.value
            })
        },
        onSuccess() {
            toasts.add("success", $ll.$.$users.$_id.$$dialogEmailChanging.confirmationEmailSent())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcUpdateEmail.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.$.$users.$_id.$$dialogEmailChanging.emailChanging()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateEmail.loading}
            label={$ll.$.$users.$_id.$$dialogEmailChanging.email()}
            bind:value={email}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateEmail.loading} text variant="error" on:click={close}>
            {$ll.$.$users.$_id.$$dialogEmailChanging.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateEmail.loading}
            variant="success"
            on:click={qcUpdateEmail.refresh}
        >
            {$ll.$.$users.$_id.$$dialogEmailChanging.change()}
        </Button>
    </div>
</Dialog>
