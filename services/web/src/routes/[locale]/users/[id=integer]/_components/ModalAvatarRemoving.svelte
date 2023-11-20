<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    import type { User } from "$lib/types"

    export let user: User

    let visible = false

    export function open() {
        visible = true
    }

    export function close() {
        visible = false
    }

    const qcDeleteAvatar = createQueryController({
        fn() {
            return api.profile.deleteAvatar()
        },
        onSuccess() {
            user.avatar = null
            toasts.add(
                "success",
                $t("components.modal-avatar-removing.avatar-removed-successfully")
            )
            close()
        }
    })
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcDeleteAvatar.loading} bind:visible>
    <div>
        <h1>{$t("components.modal-avatar-removing.avatar-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.modal-avatar-removing.avatar-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteAvatar.loading} text variant="success" on:click={close}>
            {$t("components.modal-avatar-removing.cancel")}
        </Button>
        <Button loading={$qcDeleteAvatar.loading} variant="error" on:click={qcDeleteAvatar.refresh}>
            {$t("components.modal-avatar-removing.remove")}
        </Button>
    </div>
</Modal>
