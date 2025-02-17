<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

    interface Props {
        user: schemasModels.user.User
    }

    let { user = $bindable() }: Props = $props()

    let dialog = $state<Dialog>()

    export function open() {
        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qDeleteAvatar = useQuery({
        fn() {
            return api.profile.deleteAvatar()
        },
        onSuccess() {
            user.avatar = null
            toasts.add("success", $ll.avatarRemovedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qDeleteAvatar.loading}
>
    <div>
        <h1>{$ll.avatarRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.avatarRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qDeleteAvatar.loading} text variant="success" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button loading={qDeleteAvatar.loading} variant="error" onclick={qDeleteAvatar.refetch}>
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
