<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"

    interface Props {
        user: schemasModels.user.User
    }

    const { user }: Props = $props()

    let dialog = $state<Dialog>()

    let username = $state("")

    const vldResultUsername = $derived(user.username === username)

    const completedForm = $derived(vldResultUsername)

    export function open() {
        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qDeleteUser = useQuery({
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
    persistent={qDeleteUser.loading}
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
            disabled={qDeleteUser.loading}
            label={$ll.username()}
            placeholder={user.username}
            bind:value={username}
            data-testid="username-input"
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qDeleteUser.loading} text variant="success" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qDeleteUser.loading}
            variant="error"
            onclick={qDeleteUser.refetch}
            data-testid="remove-user-dialog-button"
        >
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
