<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    interface Props {
        user: schemasModels.user.User
    }

    const { user }: Props = $props()

    let dialog = $state<Dialog>()

    let email = $state("")

    const vldResultEmail = $derived(vld.user.email(email))

    const completedForm = $derived(vldResultEmail.valid && vldResultEmail.value !== user.email)

    export function open() {
        email = user.email ?? ""

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qUpdateEmail = useQuery({
        fn() {
            return api.profile.sendEmailUpdateEmailToOld({
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
    persistent={qUpdateEmail.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.emailChanging()}</h1>
    </div>
    <div>
        <TextField disabled={qUpdateEmail.loading} label={$ll.email()} bind:value={email} />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qUpdateEmail.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qUpdateEmail.loading}
            variant="success"
            onclick={qUpdateEmail.refetch}
        >
            {$ll.change()}
        </Button>
    </div>
</Dialog>
