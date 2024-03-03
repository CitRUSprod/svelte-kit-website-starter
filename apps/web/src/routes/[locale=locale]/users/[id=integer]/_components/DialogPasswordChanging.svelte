<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let dialog: Dialog

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

        dialog.open()
    }

    export function close() {
        dialog.close()
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
                $ll.$.$users.$_id.$$dialogPasswordChanging.passwordChangedSuccessfully()
            )
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1 class="u:text-center">
            {$ll.$.$users.$_id.$$dialogPasswordChanging.passwordChanging()}
        </h1>
    </div>
    <div>
        <TextField
            disabled={$qcChangePassword.loading}
            label={$ll.$.$users.$_id.$$dialogPasswordChanging.oldPassword()}
            type="password"
            bind:value={oldPassword}
        />
    </div>
    <div>
        <TextField
            disabled={$qcChangePassword.loading}
            label={$ll.$.$users.$_id.$$dialogPasswordChanging.newPassword()}
            type="password"
            bind:value={newPassword}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcChangePassword.loading} text variant="error" on:click={close}>
            {$ll.$.$users.$_id.$$dialogPasswordChanging.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcChangePassword.loading}
            variant="success"
            on:click={qcChangePassword.refresh}
        >
            {$ll.$.$users.$_id.$$dialogPasswordChanging.change()}
        </Button>
    </div>
</Dialog>
