<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import { reconnectSocket } from "$lib/utils"

    type User = schemasRoutes.profile.$GetUserResponse

    interface Props {
        user: User
    }

    const { user }: Props = $props()

    let dialog = $state<Dialog>()

    let username = $state("")

    const vldResultUsername = $derived(user.username === username)

    const completedForm = $derived(vldResultUsername)

    export function open() {
        username = ""

        dialog?.open()
    }

    export function close() {
        username = ""

        dialog?.close()
    }

    const qDeleteUser = useQuery({
        fn() {
            return api.profile.deleteUser()
        },
        async onSuccess() {
            toasts.add("success", $ll.userRemovedSuccessfully())
            close()
            reconnectSocket()
            await goto($localePath("/"), {
                replaceState: true,
                invalidateAll: true
            })
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:w-100"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.userRemoving()}
    persistent={qDeleteUser.loading}
>
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
        <Button disabled={qDeleteUser.loading} text variant="success" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qDeleteUser.loading}
            variant="error"
            onClick={qDeleteUser.refetch}
            data-testid="remove-user-dialog-button"
        >
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
