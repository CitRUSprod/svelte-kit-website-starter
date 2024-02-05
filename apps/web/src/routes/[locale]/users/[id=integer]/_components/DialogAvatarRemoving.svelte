<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { t } from "$lib/locales"
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
                $t("components.dialog-avatar-removing.avatar-removed-successfully")
            )
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1>{$t("components.dialog-avatar-removing.avatar-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.dialog-avatar-removing.avatar-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteAvatar.loading} text variant="success" on:click={close}>
            {$t("components.dialog-avatar-removing.cancel")}
        </Button>
        <Button loading={$qcDeleteAvatar.loading} variant="error" on:click={qcDeleteAvatar.refresh}>
            {$t("components.dialog-avatar-removing.remove")}
        </Button>
    </div>
</Dialog>
