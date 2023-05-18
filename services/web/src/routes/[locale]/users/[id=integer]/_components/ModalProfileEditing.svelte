<script lang="ts">
    import { Button, TextField, Modal } from "$lib/components"

    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { User } from "$lib/types"

    export let user: User

    let visible = false

    let username = ""
    let email = ""

    $: vldResultUsername = vld.user.username(username)
    $: vldResultEmail = vld.user.email(email)

    $: completedForm =
        vldResultUsername.valid &&
        vldResultEmail.valid &&
        (vldResultUsername.value !== user.username || vldResultEmail.value !== user.email)

    export function open() {
        username = user.username
        email = user.email ?? ""

        visible = true
    }

    export function close() {
        visible = false
    }

    const qcUpdateUser = createQueryController({
        fn() {
            return api.profile.updateUser({
                email: vldResultEmail.value,
                username: vldResultUsername.value
            })
        },
        onSuccess(localUser) {
            user = localUser
            toasts.add(
                "success",
                $t("components.modal-profile-editing.profile-edited-successfully")
            )
            close()
        }
    })
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcUpdateUser.loading} bind:visible>
    <div>
        <h1 class="u:text-center">{$t("components.modal-profile-editing.profile-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateUser.loading}
            label={$t("components.modal-profile-editing.username")}
            bind:value={username}
        />
    </div>
    <div>
        <TextField
            disabled={$qcUpdateUser.loading}
            label={$t("components.modal-profile-editing.email")}
            bind:value={email}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateUser.loading} text type="error" on:click={close}>
            {$t("components.modal-profile-editing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateUser.loading}
            type="success"
            on:click={qcUpdateUser.refresh}
        >
            {$t("components.modal-profile-editing.save")}
        </Button>
    </div>
</Modal>
