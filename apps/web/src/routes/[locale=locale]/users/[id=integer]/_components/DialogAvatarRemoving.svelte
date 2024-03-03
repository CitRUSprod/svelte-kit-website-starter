<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let user: schemasModels.user.User

    let dialog: Dialog

    export function open() {
        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcDeleteAvatar = createQueryController({
        fn() {
            return api.profile.deleteAvatar()
        },
        onSuccess() {
            user.avatar = null
            toasts.add(
                "success",
                $ll.$.$users.$_id.$$dialogAvatarRemoving.avatarRemovedSuccessfully()
            )
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1>{$ll.$.$users.$_id.$$dialogAvatarRemoving.avatarRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.$.$users.$_id.$$dialogAvatarRemoving.avatarRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteAvatar.loading} text variant="success" on:click={close}>
            {$ll.$.$users.$_id.$$dialogAvatarRemoving.cancel()}
        </Button>
        <Button loading={$qcDeleteAvatar.loading} variant="error" on:click={qcDeleteAvatar.refresh}>
            {$ll.$.$users.$_id.$$dialogAvatarRemoving.remove()}
        </Button>
    </div>
</Dialog>
