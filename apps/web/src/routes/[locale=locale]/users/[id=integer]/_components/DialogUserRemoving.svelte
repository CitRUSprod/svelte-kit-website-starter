<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { socket, createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let user: schemasModels.user.User

    let dialog: Dialog

    let username = ""

    $: vldResultUsername = user.username === username

    $: completedForm = vldResultUsername

    export function open() {
        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcDeleteUser = createQueryController({
        fn() {
            return api.profile.deleteUser()
        },
        async onSuccess() {
            toasts.add("success", $ll.userRemovedSuccessfully())
            close()
            socket.disconnect().connect()
            await goto($localePath("/"), {
                replaceState: true,
                invalidateAll: true
            })
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcDeleteUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.userRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.userRemovingQuestion()}</p>
    </div>
    <div>
        <p>{$ll.userRemovingConfirmation()}</p>
    </div>
    <div>
        <TextField
            disabled={$qcDeleteUser.loading}
            label={$ll.username()}
            placeholder={user.username}
            bind:value={username}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteUser.loading} text variant="success" on:click={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcDeleteUser.loading}
            variant="error"
            on:click={qcDeleteUser.refresh}
        >
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
