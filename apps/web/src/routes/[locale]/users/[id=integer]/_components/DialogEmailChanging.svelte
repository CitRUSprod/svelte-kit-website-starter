<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
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
            toasts.add(
                "success",
                "Письмо с подтверждением было отправлено на ваш текущий адрес электронной почты"
            )
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1 class="u:text-center">Изменение электронной почты</h1>
    </div>
    <div>
        <TextField disabled={$qcUpdateEmail.loading} label="Электронная почта" bind:value={email} />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateEmail.loading} text variant="error" on:click={close}>
            Отмена
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateEmail.loading}
            variant="success"
            on:click={qcUpdateEmail.refresh}
        >
            Изменить
        </Button>
    </div>
</Dialog>
