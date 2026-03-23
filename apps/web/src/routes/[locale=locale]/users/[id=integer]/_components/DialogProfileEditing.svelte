<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    type User = schemasRoutes.profile.$GetUserResponse

    interface Props {
        user: User
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
        username = ""

        dialog?.close()
    }

    const qUpdateUser = useQuery({
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
    persistent={qUpdateUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.profileEditing()}</h1>
    </div>
    <div>
        <TextField disabled={qUpdateUser.loading} label={$ll.username()} bind:value={username} />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qUpdateUser.loading} text variant="error" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qUpdateUser.loading}
            variant="success"
            onClick={qUpdateUser.refetch}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
