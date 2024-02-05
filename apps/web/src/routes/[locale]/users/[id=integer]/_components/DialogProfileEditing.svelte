<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let user: schemasModels.user.User

    let dialog: Dialog

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

        dialog.open()
    }

    export function close() {
        dialog.close()
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
                $t("components.dialog-profile-editing.profile-edited-successfully")
            )
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1 class="u:text-center">{$t("components.dialog-profile-editing.profile-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateUser.loading}
            label={$t("components.dialog-profile-editing.username")}
            bind:value={username}
        />
    </div>
    <div>
        <TextField
            disabled={$qcUpdateUser.loading}
            label={$t("components.dialog-profile-editing.email")}
            bind:value={email}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateUser.loading} text variant="error" on:click={close}>
            {$t("components.dialog-profile-editing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateUser.loading}
            variant="success"
            on:click={qcUpdateUser.refresh}
        >
            {$t("components.dialog-profile-editing.save")}
        </Button>
    </div>
</Dialog>
