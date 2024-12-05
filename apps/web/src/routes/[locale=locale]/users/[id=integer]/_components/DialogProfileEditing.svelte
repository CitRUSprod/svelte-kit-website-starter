<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    interface Props {
        user: schemasModels.user.User
    }

    let { user = $bindable() }: Props = $props()

    let dialog = $state<Dialog>()

    let username = $state("")

    const vldResultUsername = $derived(vld.user.username(username))

    const completedForm = $derived(
        vldResultUsername.valid && vldResultUsername.value !== user.username
    )

    export function open() {
        username = user.username

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qcUpdateUser = createQueryController({
        fn() {
            return api.profile.updateUser({
                username: vldResultUsername.value
            })
        },
        onSuccess(localUser) {
            user = localUser
            toasts.add("success", $ll.profileEditedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcUpdateUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.profileEditing()}</h1>
    </div>
    <div>
        <TextField disabled={$qcUpdateUser.loading} label={$ll.username()} bind:value={username} />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateUser.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateUser.loading}
            variant="success"
            onclick={qcUpdateUser.refresh}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
