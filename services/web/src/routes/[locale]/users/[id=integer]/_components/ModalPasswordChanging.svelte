<script lang="ts">
    import { Button, TextField, Modal } from "$lib/components"

    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let visible = false

    let oldPassword = ""
    let newPassword = ""

    $: vldResultOldPassword = vld.user.password(oldPassword)
    $: vldResultNewPassword = vld.user.password(newPassword)

    $: completedForm =
        vldResultOldPassword.valid &&
        vldResultNewPassword.valid &&
        vldResultOldPassword.value !== vldResultNewPassword.value

    export function open() {
        oldPassword = ""
        newPassword = ""

        visible = true
    }

    export function close() {
        visible = false
    }

    const qcChangePassword = createQueryController({
        fn() {
            return api.profile.changePassword({
                oldPassword: vldResultOldPassword.value,
                newPassword: vldResultNewPassword.value
            })
        },
        onSuccess() {
            toasts.add(
                "success",
                $t("components.modal-password-changing.password-changed-successfully")
            )
            close()
        }
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcChangePassword.loading}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-password-changing.password-changing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcChangePassword.loading}
            label={$t("components.modal-password-changing.old-password")}
            type="password"
            bind:value={oldPassword}
        />
    </div>
    <div>
        <TextField
            disabled={$qcChangePassword.loading}
            label={$t("components.modal-password-changing.new-password")}
            type="password"
            bind:value={newPassword}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcChangePassword.loading} text variant="error" on:click={close}>
            {$t("components.modal-password-changing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcChangePassword.loading}
            variant="success"
            on:click={qcChangePassword.refresh}
        >
            {$t("components.modal-password-changing.change")}
        </Button>
    </div>
</Modal>
