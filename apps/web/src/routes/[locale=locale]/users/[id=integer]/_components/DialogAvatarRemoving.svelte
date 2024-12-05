<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

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

    const qcDeleteAvatar = createQueryController({
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
    persistent={$qcDeleteAvatar.loading}
>
    <div>
        <h1>{$ll.avatarRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.avatarRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteAvatar.loading} text variant="success" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button loading={$qcDeleteAvatar.loading} variant="error" onclick={qcDeleteAvatar.refresh}>
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
